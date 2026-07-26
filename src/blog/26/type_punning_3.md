Last post in the punning series: Object lifetime (C++) vs effective type (C).

Consider this 🔗https://godbolt.org/z/36bfbjK6e
1️⃣ `*X** *p *= *new (storage) X;*`
A real `X` object is created in `storage`. The constructor runs and sets `value = 42`. The original bytes `{ 1, 1, 0, 0 }` are overwritten. Well-defined ✅

2️⃣ `*X** *p *= *reinterpret*_*cast*<*X**>(*storage);*`
Gives you a pointer, but there is nothing to point *to* (no object exists). Accessing `p->value` is UB❌

3️⃣ `*X** *p *= *std::start*_*lifetime*_*as*<*X*>(*storage);*`
`X` object begins its lifetime at `storage` *without* calling the constructor. The original bytes are preserved and reinterpreted as an `X`. Well-defined ✅

*C vs C*++

👉 Cast raw buffer → read
* *C: *❌ strict aliasing
* *C*++: ❌ lifetime

👉 `memcpy` into typed object
* *C: *✅
* *C*++: ✅

👉 Union type punning
* *C: *✅
* *C*++: ❌ (UB)

👉 Placement `new`
* *C*++: ✅ Runs C-tor

👉`std::start_lifetime_as`
* *C*++*23: *✅ Zero-copy, No C-tor

👉 `malloc` + write via cast
* *C: *✅ Sets effective type 
* *C*++*20: *✅ Implicit object creation

Note: in C, malloc'd memory has no declared type, so the first write through a cast pointer *sets* the effective type. C++ only caught up with this in C++20

*Working with raw byte buffers in C*++?
Don't just cast, that's a lifetime violation.
* Use placement `new` (if you can afford to run the constructor)
* Use `memcpy` / `std::bit_cast` (if you can afford a copy)
* Use `std::start_lifetime_as` (C++23, zero-copy, no constructor).
In C, the same cast is still UB, just for a different reason (strict aliasing).

💡Bonus question: *std::start*_*lifetime*_*as*<> requires implicit-lifetime types. Can you use it with std::string?

PS: start_lifetime_as is what embedded devs have been looking for decades: A way to tell the compiler that a bit representation a is now used as an object X.

---
Type punning in C vs C++: Part 3. Lifetime