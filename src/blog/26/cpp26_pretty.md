Pretty-printing structs in C++? No macros, no external lib, just C++26 and GCC 16.1

Check it out 🔗 https://godbolt.org/z/ToWhjYh8j

Rust devs have *println!("{:*#?}", *value) *when they want a readable dump of a struct, while C++ had no standard way to iterate members by name at compile time (you either hand-wrote `operator<<`, used macros/codegen, or pulled in a third-party reflection library)

*The C*++*26 approach*
At compile time, ask the reflection API for every non-static data member of `T`, then splice each member into a normal stream expression. Names come from `*identifier*_*of*`; values come from `*obj.[:m:]*` splices.
* `^^*T*` is a reflection of the type `T`
* `*nonstatic*_*data*_*members*_*of*` yields the member list you would hand-enumerate in order.
* `*template for*` over that list expands to one statement *per member*, so each field can have its own type in the `<<` chain, no common erased type.
* `*access*_*context::current()*` ties visibility to the template’s context, which matters for private members in friendlier designs than this public-only example.

*Big thank you *👏 
* GCC maintainers for the 16.1 release
* Matt Godbolt for getting it into Compiler Explorer