ThreadFuzzer: Why fuzzing OpenThread Matter(s)

I recently came across an interesting repo 👉 https://github.com/KULeuven-COSIC/ThreadFuzzer
(currently at ⭐1)

Researchers Ilja Siroš and Jakob Heirwegh show that fuzzing Thread protocol is not just about input mutation.
📒 https://arxiv.org/html/2511.17283v2
Even though OpenThread is continuously tested via OSS-Fuzz, these additional techniques still improve bug discovery:
* it's stateful, over-the-air protocol
* it requires valid-enough packets to reach deeper logic
* uses nested TLVs (especially in MLE)

Generic fuzzing examines shallow states, while ThreadFuzzer adds hooks into packet construction and combines fuzzing strategies with a TLV-aware approach

💡Key idea: *TLV inserter*
* injects structured TLVs into packets instead of blind mutation 
* preserves validity while exploring edge cases, which improves coverage and reaches deeper states.

They report 5 previously unknown bugs in OpenThread, some reproducible on real devices.

PS: The repo/org comes from the same folks behind the Starlink fault-injection work👀
PPS: I personally find the TLV idea intriguing and will try to employ it with my fuzzing experiment.
