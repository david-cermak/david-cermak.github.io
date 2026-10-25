*Defer* in C: GCC (👍), Clang (👌) ...and MSVC ( 🤔 )

I recently wrote about implementing RAII-style in C using compiler extensions. GCC and Clang have __*attribute*__((*cleanup*)), ...but what about MSVC?
(I know, I know, embedded devs don't care much about MSVC, still...)

One option is __*try* / __*finally*.
👉https://godbolt.org/z/nz3nGYsWc (godbolt example) 
```
 __try
 {
 char *buffer = malloc(SIZE);
 if (!buffer)
 return -1;
```
 __*try* { ... }
```
 __finally
 {
 free(buffer);
 }
 }
```

But for a defer implementation, it's interesting to see what you can do with for() loop scopes.
The principle is very simple:
hashtag#*define defer(cleanup) for (int* _*i* = *0*; !_*i*; ++_*i, cleanup*)

And then there are libraries taking this idea much further. For example, the *STC library* provides a C99-friendly approach to scoped cleanup and much more.
👉https://godbolt.org/z/dd5nr9v97 (godbolt example) 
```
 char *buffer = malloc(SIZE);
 c_defer(
 free(buffer)
 )
 {
 if (!buffer)
 break_c_defer;
```
 ....
 }

PS: planning to start a small series about STC and bringing some interesting features from modern languages into C99. Standard containers, vectors, coroutines… 👀