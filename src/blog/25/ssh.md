🚀 *SSH server *running on hashtag#ESP32?

Check out the preliminary port of hashtag#libssh to *ESP-IDF:*

https://lnkd.in/ezrf-r-8

Big thanks to Chris Gammell for the inspiration -- his remote shell for Zephyr devices got me thinking: What if we could run a full-blown *sshd *on *ESP-IDF.*
And we can.

📊 Early results:
* Flash: ~100K code, ~100K data
* SRAM: ~10K
* HEAP: ~25K per SSH connection

🔍 A few alternatives:
* OpenSSH - full-featured, open source, but not embedded-friendly
* libssh2 - open source, client-only (IDF port exists)
* wolfSSH - lightweight and embedded-friendly, but commercially licensed

⚠️ This is just the initial version, sharing it early for evaluation. A more complete and supported component with *esp-console *integration coming soon!