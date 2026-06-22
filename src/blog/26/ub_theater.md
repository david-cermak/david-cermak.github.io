UB Theatre: Nasal Demons in C, C++ and Rust

Someone commented on one of my posts: "UB is just theater."
Let's explore why it exists and whether it still makes sense in 2026.

*UB was a deliberate design choice:*
When C was standardized (C89), the committee introduced three categories: implementation-defined, unspecified, and undefined behavior. The goal was to make C work on every "sane" architecture and allow direct hardware manipulation.
The C Rationale: UB exists to "give the implementor license not to catch certain program errors that are difficult to diagnose," to avoid favoring one implementation strategy over another, and to allow conforming language extensions.
The original motivation was portability, not performance. Modern compilers now exploit UB aggressively for optimization (assuming signed overflow never happens, reordering or eliminating code, ...)

*Rust takes a different path:*
Eliminate UB in safe code (what C/C++ leaves undefined, Rust defines):
👉 Out-of-bounds indexing? Runtime panic, not silent corruption.
👉 Integer overflow? Panic in debug, two's-complement wrap in release, never UB.
👉 Memory violations? Caught by the borrow checker at compile time.
UB still exists in Rust, but only inside unsafe blocks.

*Comparison (*simplified):
* *C, C*++: Maximum freedom for compilers/hardware. UB enables aggressive optimization. Programmers must manually avoid it (or follow MISRA, use sanitizers, etc.).
* *Rust: *Safety by default. Common errors become panics or defined wraps. UB is quarantined in unsafe.
* *Managed languages (*Java, C#, Swift): UB categories are mostly banned. Overflow wraps or throws. The cost is runtime overhead (GC, bounds checks).

*My question for 2026:*
Most compilers now have flags to detect/report UB ( `-fsanitize=undefined`, `-ftrapv`, etc.). LLVM and GCC have made massive progress here. Isn't it time to enable them by default?
What do you think? 👇