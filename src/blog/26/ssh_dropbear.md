SSH stack on hashtag#ESP32:🤔libssh or dropbear?

I've ported dropbear to ESP-IDF so we can compare it with libssh:
*Flash*
* Binary size: 917 KB (dropbear) vs 1,057 KB (libssh): About 140 KB smaller
* SSH stack (library + crypto): 119 KB vs 311 KB: dropbear is ~192 KB smaller
*Runtime memory*
* Heap per session: 32 KB (dropbear) vs 28 KB (libssh)
* Init cost: 0.4 KB vs 2.6 KB: dropbear’s init is lighter
* Peak main-task stack: 4.3 KB vs 4.7 KB (of 8 KB)
* Static DRAM (.data + .bss): 3 KB vs 11 KB

dropbear uses less flash and static RAM, with a lighter init.
libssh uses slightly less heap per session, mainly due to ~4 KB used by an additional esp-shell task for serving commands.

For some projects, the real differentiator may not be memory, but licensing (libssh is licensed under LGPL-2.1).

If you’re working on embedded SSH, you can find the port, example server, and comparison charts here:
🔗 https://github.com/david-cermak/dropbear

Thanks to Alan C. Assis for pointing me toward dropbear as an embedded friendly option to SSH server.