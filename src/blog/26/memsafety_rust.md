Memory safety in Rust?🤔 No `unsafe`, still UB.

An interesting advisory popped up this weekend:
🔗 https://github.com/advisories/GHSA-j8cj-hw74-64jv

It affects v0.2.0 of the `hivex` crate (rust bindings for a Windows registry hive library)
• close() freed a native resource but didn’t prevent the destructor (Drop) from freeing it again → double-free
• from_handle() was exposed as a safe API, allowing multiple owners of the same raw handle → use-after-free / UB

The fix in v0.2.1 makes from_handle() explicitly unsafe and ensures the destructor doesn’t run after close() 👉https://codeberg.org/1millibyte/toolsnt/commit/f4c7a0d1fc4a08ce40bb76e447a69a6f383a916e
👉 Read more: https://rustsec.org/advisories/RUSTSEC-2026-0029.html

PS: Rust’s guarantees hold only if unsafe abstractions are correctly encapsulated.
