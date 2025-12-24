Dear Network,
just published a new blog post about *esp-wifi-remote. *Many of you have been playing with Wi-Fi on ESP32-P4 (despite it has no wireless hardware).

This article explains how it works👉https://developer.espressif.com/blog/2025/09/esp-wifi-remote/
esp-wifi-remote is essentially an API translation layer that routes *esp-wifi *calls to an external Wi-Fi chip.

The real work here is done by the *esp-hosted *team's solution, which handles the communication between host and slave devices. They've built something solid that delivers up to 50Mbps TCP throughput. Credit: Yogesh Mantri, Kam Yung Soh.

💬Curious about the niche use case of running dual hashtag#WiFi interfaces on a single hashtag#ESP32; What do you think?