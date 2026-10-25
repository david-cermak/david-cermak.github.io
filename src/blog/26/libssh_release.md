🚀 libssh/embedded v0.12.0~3 released

Hi Network,
I'm happy to share that I've just released *libssh-0.12.0~3* embedded port (ESP-IDF/Zephyr)
 👉 https://github.com/david-cermak/libssh/tree/v0.12.0_3 (GitHub repo)

What's new
* Native mbedTLS v4 support
 - my little contribution to the upstream libssh project (check the first comment for links/details)
* Support for PQC key exchange (off by deafult)
 - already shared a detailed, per algorithm memory footprint report
* Includes recent security bugfixes from libssh-0.12.2 upstream release

If you're using SSH on embedded devices, I'd love to hear how it works for you!
