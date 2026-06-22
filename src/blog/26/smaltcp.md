#ESP32 running the Rust smoltcp TCP/IP stack 🚀

Check it out 👉 https://developer.espressif.com/blog/2026/06/rust-smoltcp-network-stack-for-esp-idf/
Yes, ESP-IDF can run a custom TCP/IP stack.

Some takeaways:
* Install a custom network stack with a single command:
 *idf.py add-dependency*
* Use Rust-native components directly from your ESP32 application
* Still using the *ESP-IDF *ecosystem and existing networking libraries
* Explore the performance and capabilities of the smoltcp stack

This component is currently not production ready, but it is a nice example of how Rust and *ESP-IDF *can work together in one SDK (rather than two separate/competing solutions).

Credit and kudos to Mr. Sylwester Sosnowski for the impressive work! 👏