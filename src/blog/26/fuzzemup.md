Firmware Fuzzing: Black-box, no source? Use EM

An interesting paper "𝐅𝐮𝐳𝐳'𝐄𝐌𝐮𝐩" proposes an alternative to the traditional grey-box/coverage guided fuzzing: Using the device's 𝐞𝐥𝐞𝐜𝐭𝐫𝐨𝐦𝐚𝐠𝐧𝐞𝐭𝐢𝐜 𝐞𝐦𝐢𝐬𝐬𝐢𝐨𝐧𝐬 (EM) as a source of execution feedback.
👉 https://arxiv.org/html/2607.16487v1

𝐓𝐡𝐞 𝐢𝐝𝐞𝐚:
Every MCU leaks tiny electromagnetic signals while executing instructions. Different execution paths produce slightly different EM patterns. By placing an inexpensive EM probe near the chip, the researchers collect these traces and use them as "coverage" information to guide the fuzzer. Since raw measurements are noisy and executions are never perfectly aligned, they combine frequency-band selection with dynamic time warping (DTW) to recognize when two executions begin to diverge.

𝐓𝐡𝐞 𝐫𝐞𝐬𝐮𝐥𝐭𝐬:
Instead of blindly mutating inputs, the fuzzer can identify inputs that appear to drive the firmware down previously unseen execution paths (without seeing the source or instrumenting the binary). On four real firmware targets, this EM-guided approach explored more execution paths and achieved higher code coverage than traditional unguided black-box fuzzing.

𝐓𝐡𝐞 𝐭𝐫𝐞𝐧𝐝:
What I find particularly interesting is that this is part of a broader trend. Just last month another paper ("PowerFuzz": links in the comments) showed a similar concept using power consumption instead of EM emissions as the feedback channel. We're starting to see hardware side channels becoming practical substitutes for traditional coverage instrumentation.

𝐓𝐡𝐞 𝐥𝐞𝐬𝐬𝐨𝐧:
The hardware is telling us what the software is doing, we just have to... listen