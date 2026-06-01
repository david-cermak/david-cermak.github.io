Is 2026 Another 2011 for C++? Slides of the BeCPP 2026 published last week

Herb Sutter: "*C*++ *Growth, Power, Security, and AI"*
👉 https://www.youtube.com/watch?v=QWqfJtjTAdw
* Performance-per-watt is the #*1 *constraint
* C++26 addresses safety with measurable results
* AI bubble or not, the infra for power capacity is being built and the languages that will run on it are C, C++, and Rust

Chris Croft-White: "*Agentic Time-Travel Debugging"*
👉 https://becpp.org/Symposium2026/material/BeCPP%20-%202026-03-30%20-%20Chris%20Croft-White%20-%20Agentic%20Time-Travel%20Debugging.pdf
* GDB reverse-stepping (rr) + agentic debugging

Gabriel Dos Reis: "*Tightening the Screws with C*++ *Profiles"*
👉 https://becpp.org/Symposium2026/material/BeCPP%20-%202026-03-30%20-%20Gabriel%20Dos%20Reis%20-%20Tightening%20the%20Screws%20with%20C++%20Profiles.pdf
* New attributes that enforce/suppress : [[profiles::enforce(...)]], [[profiles::suppress(rule, "justification")]], [[profiles::require(...)]]...
*  Unlike warnings (which you can ignore) or UBSan (runtime), profiles are compile-time rejections with scoped, justified suppressions

Any more👉 https://becpp.org/blog/2026/04/16/slides-of-the-becpp-symposium-2026-sessions/ including Catch23 test framework, CUDA C++ toolbox, type punning.
C++ in 2026 is maturing through better tooling and safety improvements.

🗨️WDYT: "Rewrite in Rust" or "Recompile with C++26 compiler"?