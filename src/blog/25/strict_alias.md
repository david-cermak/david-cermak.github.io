⚙️*Strict aliasing *and *volatile *in embedded C

Many embedded engineers (myself included) write something like:
*union {*
 *struct {*
 *uint32*_*t LED*_*ON : 1;*
 *uint32*_*t LED*_*PWM : 3;*
 } *bits;*
 *uint32*_*t value;*
} *LED*_*CTRL;*

And it works! Even though all compilers accept it, *reading or writing through a different union member or pointer type is not guaranteed by the C standard.*

Here's where "strict aliasing" and "inactive members" might cause trouble:
* The compiler may assume different types don't alias
* Reads/writes might be reordered or skipped
* Code that looked fine at -O1 suddenly misbehaves at -O2

👉 Try this Godbolt example: https://lnkd.in/ei9vVzey
(try adding "-fstrict-aliasing")

To stay safe:
* Mark shared registers volatile
* Avoid mixing pointer casts + unions
* Use std::bit_cast() in C++

---
💬 *TL;DR*
Type punning and strict aliasing can produce different behaviour across optimization levels or compilers.