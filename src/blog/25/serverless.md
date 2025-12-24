*No public IPs. No cloud services.*
Just two ESP32s, brokering MQTT across isolated networks.

This example demonstrates how to enable MQTT publish/subscribe across remote sites without relying on any external infrastructure:

https://github.com/espressif/esp-protocols/tree/master/components/mosquitto/examples/serverless_mqtt

*Key features:*
🛜 Each ESP32 runs an isolated Wi-Fi network (AP mode) for local IoT devices
🔁 Peer-to-peer connectivity between ESP32s using either ICE-UDP or full WebRTC
🔗 MQTT brokers running on each ESP32, bridged to relay messages across sites
No cloud, no public IPs, no global IPv6, just embedded devices establishing a direct path and synchronizing MQTT topics end to end.

 ⚠️This example can only serve a small number of devices on each site (depending on how many stations could connect to one soft AP).