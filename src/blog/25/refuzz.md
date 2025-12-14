# ReFuzz and the Case for Reusing Tests in Hardware Fuzzing

Overview and personal take on the recent paper "Adaptive Fuzzing Framework that Reuses Tests from Prior Processors"
* Texas A&M, TU Darmstadt
* https://semiengineering.com/adaptive-fuzzing-framework-that-reuses-tests-from-prior-processors-texas-am-tu-darmstadt/
* Technical paper: https://arxiv.org/pdf/2512.04436

## 1. Why Hardware Fuzzing Matters

Software people are used to fuzzing: throw huge numbers of slightly-randomized inputs at a program, watch for crashes or misbehavior, and use feedback (like coverage) to guide where to explore next. The same idea now applies to processors themselves.

A modern processor is a big, stateful, concurrent system. The ISA defines what *should* happen for each instruction sequence, but the microarchitecture that actually implements those semantics is incredibly complex: out-of-order execution, speculation, caches, reorder buffers, coherence protocols, performance counters, and so on. That complexity, plus the industry norm of reusing design blocks across generations, makes it easy for subtle bugs and vulnerabilities to survive and propagate.

Traditional pre-silicon verification combines:

- **Directed tests**: handcrafted sequences aimed at known bug patterns (CVEs, CWEs, vendor checklists). They’re effective but expensive to write and require deep architecture knowledge.
- **Random tests**: large volumes of automatically generated instruction streams that try to shake the design and see what falls out. These scale, but are often coverage-inefficient.

**Hardware fuzzing** sits between those extremes. A hardware fuzzer:

- **Generates seeds**: initial instruction sequences consistent with the ISA.
- **Mutates seeds**: flips bits, shuffles instructions, tweaks operands—AFL-style—to explore nearby behaviors.
- **Collects feedback**: typically coverage in the RTL (branches, FSM states, toggles, CSR values, etc.).
- **Detects bugs**: either with assertions in the RTL or differential testing against a golden reference (e.g., Spike for RISC-V). Any divergence indicates a hardware bug.

The key difference from software fuzzing is the feedback layer: instead of source-level coverage, hardware fuzzers instrument the simulation environment or use simulator coverage databases to understand how much of the *design* has been exercised. With the right feedback and mutation operators, fuzzers have already found functional incorrectness, timing side-channels, and speculative execution vulnerabilities in multiple open-source CPUs.

## 2. A Software-Triggered Hardware Bug: FENCE.I Deadlock

One of the most striking examples in the ReFuzz work is a pure hardware bug that becomes a software exploit: a **denial-of-service (DoS) attack via a memory deadlock**.

On the RSD RISC-V processor, there exists a vulnerability (V1) where executing the `FENCE.I` instruction can cause a **memory deadlock** deep inside the microarchitecture. The key points:

- **Bug location**: the problem isn’t in the ISA spec, the OS, or user code, but in how the implementation handles instruction-cache synchronization and memory ordering for `FENCE.I`.
- **Trigger**: a specific instruction sequence containing `FENCE.I` drives the memory subsystem into a state where internal controllers (e.g., MSHRs) can no longer make forward progress.
- **Symptom**: the processor effectively hangs; debug logs repeatedly report deadlock conditions.

From a software attacker’s perspective, this is a gift:

- The exploit can be as simple as a tiny user-mode program that executes `fence.i` in a loop.
- No special privileges are required—any code allowed to run arbitrary instructions can invoke the bug.
- The impact is **DoS**: critical workloads stall, real-time tasks miss deadlines, and the only recovery might be a hardware reset.

What’s important here is how the bug was *found*. ReFuzz did not synthesize the triggering program from scratch. Instead, it **reused an existing test**: a prior instruction sequence that was already known to trigger a `FENCE.I`-related bug on a different processor (CVA6). That prior-processor test (PP-test) was then run and mutated on RSD. The underlying microarchitectural details differ, but the high-level functionality—memory synchronization via `FENCE.I`—is similar enough that the old test remains an extremely good starting point.

This is the core insight: **software-triggered exploits of hardware bugs are strongly shaped by microarchitectural patterns that tend to repeat across generations and across cores that share design IP.** Once you have a test that hits a problematic pattern on one CPU, it’s often worth reusing and mutating it on others.

## 3. Reusing and Mutating Inputs Across Processor Generations

The ReFuzz framework is built around one question:

> Given a large pool of tests that have already been effective on earlier processors, how can we reuse and mutate them intelligently to expose bugs and increase coverage on a new processor-under-test (PUT)?

Naively, there are a few simple strategies, all of which turn out to be insufficient:

- **Replay the same sequence**: run all prior-processor tests on the new core, in the original order.
- **Random sampling**: pick tests from the legacy corpus at random and run them.
- **Static ranking**: sort tests by how much standalone coverage they achieved on their original processor(s), and run the “best” ones first.

The paper’s empirical results show that these strategies either:

- Fail to find *variants* of known bugs in the new microarchitecture, or
- Provide no real coverage benefit over just fuzzing the new core from scratch, and sometimes are actually slower.

Why? Two reasons:

1. **Microarchitectural drift**: the same high-level bug pattern (e.g., mishandled performance counters, memory fences, or load/store edge cases) may manifest via **different instructions and timing conditions** on a new core. Direct reuse of the old test often misses the new variant.
2. **Coverage dynamics**: the usefulness of a given test changes over the course of fuzzing. A seed that gives a big coverage jump early (around, say, 55% total coverage) may be nearly useless once you’re at 70%, where only obscure corner cases are left.

### 3.1. Mutating PP-tests: local exploration around known-good seeds

The first critical idea is to treat PP-tests as **high-value seeds** rather than final tests:

- Start from a test that is known to trigger a bug or reach rare states on some prior processor.
- Apply hardware-fuzzer-style mutations: swap opcodes, adjust operands, extend or shorten the sequence, inject memory accesses, or duplicate certain instruction patterns.
- Observe which mutants actually increase coverage or trigger new types of misbehavior on the new PUT.

This is exactly how ReFuzz uncovers, for example, **variants of performance-counter bugs** across Rocket Core, BOOMV3, and BOOMV4, and discovers that BOOMV4’s slightly different execution units and arbitration logic cause additional instructions (like `MUL` and certain branches) to double-increment the `minstret` counter. The underlying CSR update bug has been reused, but BOOMV4’s new microarchitecture introduces **more exploitable variants**.

The lesson: **systematically mutating tests that were once “effective” on an older processor is a highly leveraged strategy**. You are exploring neighborhoods in input space that you already know contain interesting behavior, but adapting them to the quirks of a new implementation.

### 3.2. Contextual bandits: when to keep mutating vs. when to switch seeds

The second critical idea is that **input reuse has to be adaptive**. Over- or under-mutating a test kills fuzzing efficiency:

- If you drop a promising test too early, you might miss nearby variants that trigger different microarchitectural paths or bug variants.
- If you keep mutating a test long after it stops yielding new coverage, you are wasting simulation time.

ReFuzz treats this as a **contextual bandit problem**:

- **Arms**: individual PP-tests (or their logical identities).
- **Context**: the current *coverage context*—roughly, “how much of the design has been covered so far?” (e.g., 55%, 60%, 65%, 70%).
- **Reward**: the *incremental coverage* that a test and its recent mutants achieve when run at that coverage context.

At each step, ReFuzz:

1. Observes the current coverage context (e.g., 60%).
2. Uses a learned policy to select a PP-test that historically gave good coverage increments at that context.
3. Lets the underlying fuzzer mutate that test for a while, aggregating the coverage gains from its mutants.
4. Updates the policy based on the observed reward.
5. Decides whether to keep mutating this seed longer or switch to another.

Over time, this **learned scheduler** discovers, for each coverage regime, which tests are worth investing mutation budget in, and which are dead ends that should be dropped. It also aggressively prunes redundant tests via a separate test-minimization step, so the bandit doesn’t waste capacity re-evaluating different tests that all cover the same design points.

The result is exactly what you would want from a practical fuzzing assistant:

- **Speed**: ReFuzz reaches given coverage targets with orders-of-magnitude fewer tests than baselines.
- **Depth**: It discovers new vulnerabilities and bug variants, including the FENCE.I DoS and multiple performance-counter issues.
- **Reusability**: All of this is achieved by squeezing more value out of tests you already ran on earlier designs.

## 4. Takeaways

- **Hardware fuzzing is becoming the de facto way to explore real-world processors before tape-out**, combining the scalability of random testing with the guidance of coverage and assertions/differential checks.
- **Hardware bugs are software-exploitable**: a single instruction (`FENCE.I` on RSD) can deadlock a core, giving a trivial DoS payload to any attacker with execution ability.
- **Test reuse is a powerful lever**. Instead of starting from scratch for each new core, treat prior-processor tests as a high-value corpus, and:
  - Mutate them to adapt to new microarchitectures.
  - Use contextual bandits (or similar adaptive strategies) to decide which seeds to keep investing in.

In other words, **ReFuzz turns legacy tests into a strategic asset**: a learned schedule for which tests to reuse, when to mutate them, and when to move on. For CPU vendors with long product lines and large regression suites, that’s the difference between barely keeping up with complexity and systematically surfacing the next generation of hardware bugs—before attackers do.
