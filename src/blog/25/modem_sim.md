#AT-ttention, please! Hear about the new modem simulator\̳r̳\̳n̳

*ESP-AT *is an excellent project that turns virtually anything into a wireless enabled device. But integrating it into existing systems often means rewriting your communication stack, standard MQTT, or HTTPS into hashtag#AT commands.
In many cases, a *DATA mode (*for talking raw IP) would seem more practical.

That's where this new modem simulator comes in: https://github.com/espressif/esp-protocols/tree/master/common_components/modem_sim

While testing the *ESP-Modem *library (which I maintain), I extended *ESP-AT *firmware with a PPP server, turning the hashtag#ESP32 into a fully functional Wi-Fi modem (I just needed a controllable "modem" device to test AT commands and PPP connections without depending on real hardware and flaky cellular signals in our test room)

💬 *Would you be interested in this as an official component?*
Please let me know in the comments! (with your potential use case)
So far, it's an internal tool only used for testing ESP-Modem (very helpful in CI reliability), but I think it might come in useful if you need to wire a quick Wi-Fi connection and still use:
* Paho MQTT in your STM32.
* HTTP client from lwIP.
* Your custom protocol implemented with BSD sockets.