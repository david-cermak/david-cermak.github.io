Embedded folks know this well: Unsigned overflow in C (and C++) is not Undefined Behaviour, so why would compilers warn us👉https://godbolt.org/z/xoGadKWWz

![Unsigned overflow demo](/images/unsigned_overflow.png)

Sometimes it’s worth jogging our own memory about patterns that are technically valid, but still risky or misleading.

I recently read this Clang Hardening Cheat Sheet🔗https://blog.quarkslab.com/clang-hardening-cheat-sheet.html
packed with practical and interesting compiler and linker flags. Highly recommended for Clang (and GCC) users. Two options I particularly like are `-D_FORTIFY_SOURCE=2` and `-fsanitize=cfi`

Big thanks to Serge Guelton, Adrien Guinet for sharing such an insightful write-up🙌

---
Some more links:
* https://wiki.debian.org/Hardening
* https://best.openssf.org/Compiler-Hardening-Guides/Compiler-Options-Hardening-Guide-for-C-and-C++.html

And about the -fzero-call-used-regs👉https://godbolt.org/z/jPWjx68js