Constant-time implementation🤔? Your compiler might break it.

An interesting vuln popped up last week:
CVE-2025-66442 in Mbed TLS (compiler-induced constant-time violation)
👉https://mbed-tls.readthedocs.io/en/latest/security-advisories/mbedtls-security-advisory-2026-03-compiler-induced-constant-time-violations/

And not for the first time, some links in the comments (the recent wolfSSL patch and the "clangover" work around ML-KEM, ...)

I was playing with a minimal repro on Godbolt, so we can literally see:
`mask & a | ~mask & b` → turned into a branch on RISC-V
👉https://godbolt.org/z/edsjqechE

A good reminder for anyone doing embedded/security work:
Check also the ASM, not just sources and treat compiler flags as a part of the model.
