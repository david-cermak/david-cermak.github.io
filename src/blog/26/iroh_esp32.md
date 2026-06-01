What is Iroh🦀? ...and can it run on ESP32?

I've recently been writing about embedded endpoints/connectivity stacks:
WebRTC, ICE, NAT traversal, QUIC, Cloudflare tunnels…

Here’s another interesting one👉https://www.iroh.computer/blog/iroh-on-esp32

So what is Iroh?
* A Rust-based library for peer-to-peer connectivity (enabling direct device-to-device communication without relying on central servers)
* Uses modern building blocks (QUIC, relays, discovery) to handle NAT traversal + encrypted transport
* A toolkit for building local-first / decentralized apps (sync, streaming, tunnels…)

And the embedded part?
- Running Iroh on ESP32 shows that even resource-constrained devices can participate in P2P networks
- Full stack is still heavy (QUIC + TLS + Rust std), so this is more about exploration than production
