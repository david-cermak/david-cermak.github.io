Type punning in C vs C++: Part 2. Strict aliasing and `restrict`

*Aliasing *means more than one pointer or reference refers to the same memory. The *strict aliasing rule *is an assumption that pointers of different types do not point to the same object. This lets the compiler optimize more aggressively. Violating strict aliasing is UB.

Consider this 👉 https://godbolt.org/z/hqe7fnbx7
```cpp
#include <stdio.h>
#include <stdint.h>

#define R restrict
// #define R

union {
    struct S1 { int a; float    f; } s1;
    struct S2 { int a; uint32_t b; } s2;
} u = {0};
int in = 1, out = 0;

int foo(int * R a, int * R b) {
    *b += *a;
    *b += *a;
    return *b;
}

float bar(struct S1 *s1, struct S2  *s2)
{
    s1->f = 1.0f;
    s2->b = 0;
    return s1->f;
}

int main()
{
    printf("foo(&in, &out) : %i\n", foo(&in, &out));
    printf("foo(&in, &in)  : %i\n", foo(&in, &in));
    printf("bar            : %f\n", bar(&u.s1, &u.s2));
}
```

*foo(): same-type pointers alias*
Both `a` and `b` are `int*`, so the compiler must assume they might alias. That means:
👉 `foo(&in, &out)` → returns 2 (as expected: 0 + 1 + 1)
👉 `foo(&in, &in)` → returns 4 (not 2! because `*b += *a` modifies what `*a` reads the second time)

*bar(): strict aliasing and union members*
👉 -O0: the compiler reloads `s1->f` from memory → returns 0.0
👉 -O2: the compiler sees that `float*` and `uint32_t*` are incompatible types. Under strict aliasing, it assumes the store to `s2->b` cannot affect `s1->f` → returns 1.0

*C vs C*++
*In C (C*99+):
* union type punning (write one member, read another) is permitted
* common initial sequence: if two struct members of a union share the same leading fields (like int a in both S1 and S2), you may read those fields through either member
*In C*++:
* reading an inactive union member is generally UB
* exception: the common initial sequence rule also exists in C++ (for standard-layout structs in a union, you may read shared leading fields through the inactive member)
* C++ aliasing rules use the concept of "dynamic type" rather than C's "effective type", and are generally stricter
* C++ has no concept of "compatible types"

`*restrict*` *keyword: int foo(int ** *restrict a, int ** *restrict b)*
The compiler must assume same-type pointers might alias. if you know they don't, use `restrict` -- it's a promise that the pointed-to object will only be accessed through that pointer during its lifetime. This lets the compiler load `*a` once, use it for both additions, and skip the reload.
 If the caller violates this contract (e.g. *foo(*&*x, *&*x) *with `restrict`) → UB.

`restrict` is only part of the C standard. C++ does not include it, but most compilers support `__restrict` or `__restrict__` as extensions.

---
💡 Bonus question: Why isn't `restrict` in C++, WYT?