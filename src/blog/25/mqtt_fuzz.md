# Fuzzing IoT Protocols with Multi-Party and LLM-Assisted Methods

MQTT is a publish/subscribe protocol, so the “interesting” behavior is rarely a single client exchanging packets with a broker. Real bugs show up when you combine **multiple parties** (publishers, subscribers, bridges) and **stateful sequencing** (connect, subscribe, publish, QoS flows, etc.).

Two recent papers approach this from different angles:

- **MBFuzzer**: make the fuzzer act like multiple MQTT parties, so the broker is forced through realistic pub/sub dependencies.
- **LLM-assisted model-based fuzzing**: use an LLM to help build a protocol model and generate *valid* stateful sequences at scale, without hand-coding an FSM.

## 1. MBFuzzer: fuzz the broker as a multi-party system

Most MQTT broker fuzzing setups look like “one client ↔ broker”. That misses an important fact: the broker’s core job is *routing between parties*. MBFuzzer embraces this and fuzzes the broker with **two concurrent clients** (a publisher and a subscriber) driven by one coordinated engine.

### 1.1. The key idea: coordinate senders with dependencies

If you fuzz publisher/subscriber completely independently, you mostly generate nonsense (e.g., publishing to topics nobody subscribed to). MBFuzzer introduces a **shared dependency queue** with protocol-aware rules so that generated sequences stay meaningful:

- A subscriber’s state (subscriptions) constrains which publishes are “interesting”.
- Delivery-related dependencies shape the interleavings worth exploring (not just random packet order).

This matters because many broker bugs are about *timing and ordering*: forwarding before a subscription “sticks”, mishandling retained messages, QoS corner cases, bridge routing, and so on.

### 1.2. Scheduling: explore interleavings, not just messages

With multiple parties, the search space becomes “message content × scheduling interleavings”. MBFuzzer uses a **priority scheduler** to pick which party sends next, so it can systematically explore:

- simple flows (subscribe → publish → deliver)
- trickier interleavings (re-subscribe, unsubscribe, reconnect, overlapping topics, etc.)

### 1.3. Beyond crashes: differential + spec-oriented checking

Crashes are great, but MQTT implementations can be “wrong” without crashing. MBFuzzer includes **differential testing** against a reference implementation to surface **logic/compliance mismatches**. The paper also discusses using an LLM-based analyzer to help triage whether a behavioral discrepancy is a real spec violation (vs. benign variation).

## 2. LLM-assisted model-based fuzzing: generate valid stateful sequences

The second paper tackles a common pain point: **stateful protocol fuzzing is bottlenecked by model building**. A good model-based fuzzer needs an FSM (or something close to it), and that’s traditionally a manual effort.

The proposal is to use an LLM as a “protocol modeling assistant”:

- extract a **compact state machine** from documentation / protocol descriptions
- produce an executable **sequence generator** (e.g., a small program) that samples transitions and emits protocol messages
- run it against the target implementation and iterate based on feedback

The practical payoff is that you can get to “valid enough” sequences quickly, so the fuzzer spends less time in rejected/ignored inputs and more time driving deep states.

### 2.1. Why the “generator program” approach is interesting

Prompting an LLM to output raw packets is brittle. Prompting it to output a *program* that:

- tracks connection/session state,
- chooses transitions according to the model,
- and emits messages accordingly,

is a neat way to make the fuzzer **repeatable**, **tunable**, and easier to evolve as you learn more about the target.

## 3. How these approaches complement each other

These are not competing ideas as much as **orthogonal levers**:

- MBFuzzer adds **parties + interleavings**, which is crucial for publish/subscribe systems.
- LLM-assisted modeling adds **state-awareness**, which is crucial for anything beyond stateless packet mutation.

If you were building a practical MQTT broker fuzzer today, you’d likely want both:

- multi-party roles (publisher/subscriber/bridge)
- a stateful generator that knows “what can happen next”
- crash + behavioral oracles (differential/spec checks)

## 4. Takeaways

- **MQTT broker fuzzing should be multi-party by default**; otherwise you’re not exercising the routing logic that defines the broker.
- **Interleavings are part of the input** in concurrent protocol systems; scheduling strategy can be as important as mutation strategy.
- **LLMs are most useful when they produce structure** (models, generators, test scaffolding), not when they “hallucinate packets”.
- **Behavioral testing matters**: in protocols, “incorrect but non-crashing” is still a bug (and often a security issue).

## References

- MBFuzzer: *A Multi-Party Protocol Fuzzer for MQTT Brokers* (USENIX Security '25 preprint): https://www.usenix.org/system/files/conference/usenixsecurity25/sec25cycle1-prepub-596-song-xiangpu.pdf
- *LLM-Assisted Model-Based Fuzzing of Protocol Implementations* (arXiv HTML): https://arxiv.org/html/2508.01750v1