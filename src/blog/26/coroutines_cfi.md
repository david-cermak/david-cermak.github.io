Are C++ coroutines 𝑐𝑜𝑛𝑡𝑟𝑜𝑙 𝑓𝑙𝑜𝑤 safe?🤔

Some time ago, I wrote about C++ coroutines and how useful they could be in embedded code.
More recently, I covered compiler hardening flags, including Control-Flow Integrity (CFI).
Putting these two topics together raises an interesting (and slightly uncomfortable) question.

CFI is designed to stop control-flow hijacking, yet modern C++ features like coroutines introduce execution patterns that existing CFI schemes don't fully model. 

A simple demo of Control flow hijack👉https://godbolt.org/z/8PWa376Ga

In the presentation below, I walk through simple (but practical) examples that demonstrate the limitations of CFI when coroutines enter the picture, including a minimal control-flow hijack you can inspect yourself.

Interesting research by CISPA-researchers 👉https://cispa.de/en/cfop shows that:
* C++ coroutines can be exploited across all major compilers.
* State-of-the-art CFI defenses can be bypassed without injecting code.
* The root cause is structural, requiring compiler-level redesign rather than simple patches.
