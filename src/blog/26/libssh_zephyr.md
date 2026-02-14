SSH server on hashtag#ESP32: ESP-IDF or Zephyr?🔐

I’ve just added initial Zephyr module support, so libssh can now run on ESP32 with either ESP-IDF or Zephyr (and potentially on other Zephyr-supported MCUs too -- not tested yet).

The fun part: you can now directly compare ESP-IDF vs Zephyr on the same hardware with the same project.
Footprint comparison (SSH server):
 • Zephyr: Flash ~177 kB, RAM ~10 kB, Kernel heap ~3 kB, User heap ~22 kB
 • ESP-IDF: Flash ~190 kB, RAM ~10 kB, Heap ~25 kB

If you’re curious about SSH on microcontrollers or comparing RTOS ecosystems on ESP32, this is a nice playground.
libssh ESP32 port🔗https://github.com/david-cermak/libssh
