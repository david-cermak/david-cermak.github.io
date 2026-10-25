*C*++ *Modules*: the language feature is only *half the story*

C++20 modules have been around for some time, but they're still not (widely) used.
I created a simple module example using CMake and GNU Make to demonstrate that the language feature support isn't enough.
* The compiler needs to understand module interfaces.
* The build system needs to discover dependencies and establish the correct compilation order.
* The package ecosystem needs to handle module interfaces and their build metadata.

*With modern CMake* (>=3.28), C++ modules are interestingly painless.
The build system handles the dependency discovery and compilation ordering instead of making you manually manage the module artifacts.
👉 https://godbolt.org/z/Eb6We55h1 (godbolt link)

*With GNU Make*, you can make it work too, but you're dealing with compiler-specific details such as GCC's CMI cache, module flags, explicit dependencies, and *.*cppm* handling.
👉 https://godbolt.org/z/8xfzn365r (godbolt link)

So it's not just about replacing: hashtag#*include "foo.h*" -> *import foo*;
The build-system and package ecosystem is the *other half of the story*.

WDYT: Will C++ tooling eventually converge toward a "Cargo-like" experience?
Or will the fragmented build/package ecosystem remain part of C++ forever?
