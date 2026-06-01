Herb Sutter on UB: "Just recompile it with C++26"

A very interesting take on UB by Mr. Herb Sutter👉 https://lnkd.in/d3S4-Pdp

* C++26 eliminates uninitialized variable UB and makes bounds checking standard for vector, string, span, and more in hardened implementations.
* Many improvements work by simply recompiling with C++26 (Google deployed similar hardening to millions of LOC with just 0.3% performance impact)
* The committee is looking into all language UB and addressing it through erroneous behavior, profiles, and contracts.

PS: Further Herb Sutter says quote, unquote: "Hardening C++ doesn’t change C++’s value proposition — it keeps C++ still C++, it doesn’t try to turn C++ into “something else” such as by requiring mandatory performance overheads"
And this isn't just talk the talk; much of it is already shipping...
