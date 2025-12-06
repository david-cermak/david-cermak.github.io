🔗 NIST has recently finalized its first *Lightweight Cryptography Standard, *selecting Ascon as the go-to algorithm family for protecting constrained devices: https://lnkd.in/eRW-HGeP

Today, ChaCha20-Poly1305 is a very popular cipher in TLS 1.3 because it’s fast in software and reliable (but maybe still relatively heavy for ultra-low-power nodes?)
Ascon offers strong authenticated encryption and hashing with a much smaller footprint, optimized for side-channel resistance.
This opens up real adoption in ultra-low-power sensors (and maybe offloading the full TLS to the gateways while keeping low-end devices secure).

I’ve been experimenting with this on ESP32: creating a non-TLS secure channel demo using Ascon AEAD and comparing with other popular AEADs:
🔗 https://lnkd.in/eb4sdd3i

👉 Have you tried offloading cryptography to the edge or gateways? What challenges did it bring and how secure do you think it really is?