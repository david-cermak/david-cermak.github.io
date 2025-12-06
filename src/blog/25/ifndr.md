Your code's wrong, and the compiler knows -- but won't tell you💥

Meet IFNDR (Ill‑Formed, *No Diagnostic Required): *C++ allows compilers to accept certain broken programs without telling you.

A classic example here 👉https://lnkd.in/eFcU4UjX
A constructor-delegation cycle -- GCC (-Wall) accepts it and you hit a stack overflow at runtime; Clang rejects it.

This looks like a stupid example, but I use delegating constructors a lot, and a new overload from a PR merge/conflict resolution can sneak in.

How to avoid it
* Pick one "primary" constructor that actually initializes the object.
* Make every other constructor delegate into that one (one-way chain).
* Prefer explicit on converting ctors to limit accidental hops.
* In CI, build with both GCC and Clang (even if your target uses only one).
* UBSan won’t catch IFNDR; run ASan on host builds to catch the stack overflow.