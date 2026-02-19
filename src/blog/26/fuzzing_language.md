Fuzzing detected more bugs in C++/Rust than Java/C? 🤔

![fuz_language](/images/fuzz_language.png)

Here's an interesting research I came across🔗https://arxiv.org/abs/2602.05312v1

Tatsuya Shirai, Olivier Nourry, Yutaro Kashiwa, Kenji Fujiwara, and Hajimu Iida
"Does Programming Language Matter? An Empirical Study of Fuzzing Bug Detection"
1) Language influences fuzzing outcomes: C++ and Rust show higher bug detection frequencies under OSS-Fuzz.
2) Rust bugs are highly reproducible but often low in vulnerability ratio, yet critical when present.
3) Bug types and detection efficiency diverge by language, e.g., Python shows higher coverage but slower discovery.

⚠️Limitations to keep in mind:
* Higher fuzz counts doesn't automatically mean "less safe" languages: Tool coverage and test harnesses differ. 
*The nature of bugs and severity classifications depend on the fuzzing harness and language ecosystems build support.

Still, this paper provides valuable cross-language insights wrtt fuzzing📊
