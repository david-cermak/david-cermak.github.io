When *Embedded *means *Realtime: *Clang 20's Realtime Sanitizer

With Clang-20, we get a nice and practical feature for realtime C++: RTSan (realtime sanitizer).

RTSan lets you enforce determinism contracts at runtime.
1) Mark realtime entry points with `[[clang::nonblocking]]`
2) Build with `-fsanitize=realtime`

If your realtime code calls something non-deterministic (malloc, free, pthread_mutex_lock, etc.), it fails fast with a clear report.
Check the esp_modem example in https://github.com/david-cermak/system-security-lab/tree/main/sanitizer/rtsan
