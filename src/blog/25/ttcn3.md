🔍 Is *TTCN-*3 still alive in 2025?
What do you use for *IoT *protocol *conformance testing?*

I recently revisited TTCN-3 with Eclipse Titan. Some years back I had put together a simple TCP/IP conformance suite for ESP32 (just reused Intel’s suite for Zephyr). That project has been archived, and Titan’s last release was in 2023… 🤔

Titan and TTCN-3 still work, are maintained, and can cover IoT conformance nicely, see my iot-conformance project 👉 https://lnkd.in/egV65eKd which runs:
* HW-in-the-loop TCP/IP tests on real ESP32 hardware
* SW-simulated MQTT tests running ESP-IDF on Linux

But it made me curious about the ecosystem today:
✅ Is using Eclipse Titan/TTCN-3 still advisable in 2025/26?
✅ Are there viable alternatives for new projects?
 1) Robot Framework?
 2) Some unit test frameworks?
 3) Custom test harnesses?

💬I’d like to hear how others approach protocol conformance testing in IoT (MQTT, CoAP, TCP/IP…). Do you stick with TTCN-3, or move toward lighter frameworks and custom setups?