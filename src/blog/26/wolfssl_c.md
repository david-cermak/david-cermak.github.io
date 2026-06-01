Why C still dominates crypto code? wolfSSL published an interesting article last week:

🔗 https://www.wolfssl.com/why-c-remains-the-gold-standard-for-cryptographic-software/
1️⃣ Memory safety is not security.
2️⃣ Crypto libs need portability.
3️⃣ Rust's safety "erode" when crypto code uses `unsafe` and inline assembly.

All valid points, but a significant portion of advisories are memory bugs and we're seeing more cryptography projects using Rust and reporting fewer CVEs.
Below is a recent CVE breakdown by bug type for OpenSSL, Mbed TLS, and wolfSSL (Interpret with caution: generated only from past 17, 72 and ~200 issues)

🗨️ WYT: are these the main reasons C dominates cryptographic software, or is it more about conservative engineering and legacy ecosystems (as in Embedded)?
