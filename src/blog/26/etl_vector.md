*std::vector* in firmware🤔? Meet the *ETL* (Embedded Template Library) by John Wellbelove.

It looks/feels like the *STL, *but is designed specifically for embedded:
* No dynamic memory allocation
* Fixed-capacity containers
* Header-only
* Works with compilers as old as C++03
* Includes much more than containers: state machines, message routing, delegates, CRCs, variants, observers, schedulers, and many modern C++ utilities backported to older toolchains.

For example, *etl::vector*<*int, 8*> stores up to eight integers inside the object itself.

```
*int main() {*
 *etl::vector*<*int, 8*> *values;*

 *for (int i *= *0; i *< *5; *++*i)*
 *values.push*_*back(i ** *i);*

 *for (int v : values)*
 *std::cout *<< *v *<< ' ';
}
```

Unlike `std::vector`, there is no heap allocation. The template parameter (8) defines the maximum capacity at compile time. Internally, the vector contains a statically allocated buffer and simply constructs/destructs elements in-place as they're inserted or removed. If you exceed the capacity, ETL reports an error according to the error policy you've configured (asserts, exceptions, callbacks, or no checks).

Check out this Godbolt and compare `etl::vector` with `stl::vector`
👉 https://godbolt.org/z/vb9b6x9Mx

If you've never looked into ETL before, it's definitely worth it or maybe just browse the sources. It's a great project that can teach you both modern C++ and embedded design.

A big thank you to Mr. John Wellbelove 👏 for creating and maintaining ETL.