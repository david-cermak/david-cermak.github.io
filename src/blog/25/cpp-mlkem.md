C++20, constexpr, header-only **ML-KEM**

![cxx-ml-kem-on-esp32](/images/mlkem.png)

Here’s an interesting C++ implementation of a standard post-quantum key exchange worth a look 👉https://github.com/itzmeanjan/ml-kem

The ML-KEM algorithm (NIST FIPS 203) is now widely deployed for PQ key establishment, and this repository explores a modern C++20, header-only, fully constexpr implementation.
* Key generation / encapsulation / decapsulation can **run at compile time** if inputs are known! Unusual, but a neat demonstration of what constexpr enables in crypto code 😀
* Everything lives in headers
* Clear, idiomatic C++ (uses fixed-size spans and compile-time sizes instead of raw pointers)
* Implements ML-KEM-512 / 768 / 1024

From an embedded angle: Compared to liboqs on ESP32, this C++20 version is ~16% slower overall for ML-KEM-768 and uses roughly 2× the stack and heap.
See full ESP32 comparison 👉https://github.com/david-cermak/upqc-lab/tree/main?tab=readme-ov-file#implementation-comparison

If you’re curious about how ML-KEM actually fits together under the hood, this is a nice place to start.
🔵 Readable reference implementation of ML-KEM in modern C++
🔵 Good way to explore lattice-based algorithms
⚠️ Treat as experimental: Timing-leakage not audited

Big👏 to Anjan Roy for this interesting implementation!
