Type punning in C vs C++: Part 1. Alignment

A few days ago I posted about type punning in C++, but this is more interesting and nuanced topic (as the comment section reminded me😄), so I'd like to revisit it, one issue at a time (First up: alignment)

Consider this 🔗 https://godbolt.org/z/3bdzeeYKz
```cpp
union  __attribute__((packed)) U {
    struct  __attribute__((packed)) {
        char padding;
        uint32_t value;
    };
    unsigned char raw[sizeof(uint32_t) + 1];
};

uint32_t read_value()
{
    union U u = {};
    u.raw[1] = 0x40;
    u.raw[2] = 0x41;
    u.raw[3] = 0x42;
    u.raw[4] = 0x43;
#if CAST
    uint32_t* ptr = (uint32_t*)(&u.value);
    return *ptr;
#else
    return u.value;
#endif
}

int main()
{
    putc(read_value(), stdout);
    return 0;
}
```

Trying to access unaligned member
👉 using pointer cast (C-style cast or reinterpret cast)
 - emits warning: taking address of packed member
 - fails with runtime error: load of misaligned address if ubsan/asan enabled
👉 union type punning -- no warnings/errors, but may fail on some architectures (if unaligned):
 - trigger a bus fault or trap with an alignment exception
 - require multiple memory accesses (with a performance penalty)
 - behave differently depending on memory type (e.g. ARM Device vs. Normal memory)

The alignment rules are essentially the same for C and C++. But the tools to deal with type punning vary:

*Union type punning*
C ✅ Explicitly allowed. You may write one member and read another.
C++ ❌ UB: only the active (most recently written) member may be read.

*memcpy*
C ✅ Safe and portable
C++ ✅ Safe and portable (compilers optimize it away)

*reinterpret*_*cast / C-style cast*
C UB if alignment or aliasing rules are violated
C++ UB if alignment, aliasing, or object-lifetime rules are violated

*std::bit*_*cast*
C N/A
C++ ✅ C++20: value-to-value, same-size, trivially copyable types

---
💡 *Bonus question*
This is exactly the same code
* https://godbolt.org/z/3hqrWEoqE in C
* https://godbolt.org/z/8Pz8nYY4c in C++
❓ Why it consistently crashes with *SIGBUS *in C++, while the same works in C