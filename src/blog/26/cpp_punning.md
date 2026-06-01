Type punning in C++: What could go wrong?

Coming from C, like most Embedded devs, it is tempting to use unions or just cast the type:
*auto bits *= **reinterpret*_*cast*<*std::uint32*_*t**>(&*my*_*float);*
which works... usually

But in C++, this can run straight into *undefined behavior:*
1️⃣ strict aliasing rules 👉 https://godbolt.org/z/dTnKhvE3b
2️⃣ alignment requirements 👉 https://godbolt.org/z/Th3qM6nsh
3️⃣ object lifetime rules 👉 https://godbolt.org/z/7jbbaroef
That matters a lot in Embedded work with raw buffers, memory-mapped registers, and packed protocols.

*The safer model:*

Use `std::bit_cast` when you want the bit pattern of one trivially copyable type as another type of the same size.

Use `std::memcpy` when you need a portable bit-copy, especially if you are not on C++20 yet.

Use `std::byte`, `char`, or `unsigned char` when you are inspecting object representation byte by byte.

And if you are turning raw storage into an actual object, remember that a cast does not start an object lifetime. That needs proper lifetime management, such as placement `new` or, in newer C++, `std::start_lifetime_as`.

Learn more 👉https://www.youtube.com/watch?v=IF47jautjVU
Big thanks to Lieven de Cock 👏 for this inspiring talk about Type Punning in C++

PS: The safe version usually compiles down to the same machine code