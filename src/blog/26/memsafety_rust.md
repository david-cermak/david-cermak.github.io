Memory safety in Rust?🤔 No `unsafe`, still UB.

An interesting advisory popped up this weekend:
🔗 https://lnkd.in/dDWj_XPx

It affects v0.2.0 of the `hivex` crate (rust bindings for a Windows registry hive library)
• close() freed a native resource but didn’t prevent the destructor (Drop) from freeing it again → double-free
• from_handle() was exposed as a safe API, allowing multiple owners of the same raw handle → use-after-free / UB

The fix in v0.2.1 makes from_handle() explicitly unsafe and ensures the destructor doesn’t run after close() 👉https://lnkd.in/dft95CQ4
👉 Read more: https://lnkd.in/d9cndnEg

PS: Rust’s guarantees hold only if unsafe abstractions are correctly encapsulated.
