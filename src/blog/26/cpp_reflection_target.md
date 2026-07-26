C++26 Reflection on Embedded Targets

Some time ago, I shared how C++26 static reflection can be used for pretty-print structures.

Now, thanks to the (almost heroic) effort of Espressif's compiler team 👏, GCC 16.1 landed in the ESP toolchain, bringing these features to embedded targets 🎉

For example, dumping Wi-Fi configuration simply with
*std::cout *<< *to*_*string(wifi*_*config.sta); *gives

*wifi*＿*sta*＿*config*＿*t *｛ 
 *ssid *＝ ＂*myssid*＂，
 *password *＝ ＂*mypassword*＂，
 *scan*＿*method *＝ *WIFI*＿*FAST*＿*SCAN*，
 *bssid *＝ *00*：*00*：*00*：*00*：*00*：*00*，
 ... ｝

This is fun. What's more exiting is using reflection to simplify boilerplate for config serialization or RPC/message marshalling (or everything what previously required macros-magic, code-gen, or external libs)

GitHub demo 👉 https://github.com/david-cermak/esp-network-examples/blob/423e1e83c09bbabf47b09c39a6bf2319d3afdb75/reflection/main/station_example_main.cpp#L49-L75
Build/run with the latest toolchain (from ESP-IDF master branch)