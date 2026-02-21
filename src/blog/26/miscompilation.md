Miscompilation in 2026?🤔 both gcc and clang? ...not really

![miscompilation](/images/miscompilation.png)


Reading this article about gcc/clang generating incorrect assembly for a trivial C++ example🔗 https://www.webpronews.com/the-hidden-compiler-bug-that-quietly-breaks-your-c-code-how-gcc-and-clang-both-generate-incorrect-assembly/

The code just checks whether a `std::array<int, NUM>` contains only zeros. Changing `NUM` produces different (odd-looking) assembly, and maybe an unnecessary stack store in clang.

Here's a blog post about these findings🔗 https://codingmarginalia.blogspot.com/2026/02/both-gcc-and-clang-generate.html
The observable behavior is correct IMO, and the differences appear to be optimizer heuristics and missed cleanups ➡️ not miscompilations.
https://godbolt.org/z/5b43cYGGd

💬I haven’t found any actual gcc bugzilla or LLVM issue tracking this as a real correctness bug. Has anyone seen a formal bug report?