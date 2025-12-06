Alice and Bob walk into a quantum bar ⚛️
*Bartender: "*Why handshake?"
*Bob: "*Alice has the key, I’m on hashtag#ESP32."

Sounds like hashtag#funForFriday, but it’s not just a joke.
I turned this anecdote into a real demo: 👉https://lnkd.in/epGxnntT

Linux server and an ESP32 as client building a post-quantum secure TCP channel in 6 steps 🔐:
1) Alice → Bob: send Kyber (ML-KEM-512) public key (post-quantum KEM)
2) Bob → Alice: encapsulate + send ciphertext
3) Both: decapsulate/derive → shared secret
4) Both: HKDF-SHA256 (extract + expand) → AES-256-GCM key
5) A → B: encrypted record `[IV | ciphertext | tag]` with seq-nr in AAD
6) B → A: encrypted record `[IV | ciphertext | tag]` with seq-nr in AAD

This is a lightweight proof-of-concept showing hashtag#PQC between a PC and a microcontroller. I used a reference Kyber implementation (no platform optimizations): KEM-512 encapsulation on the ESP32 is about ~10 ms in my test.

*Next steps:*
* Swap in an ESP32-optimized implementation and measure speed vs resource use
* Compare handshake and memory cost vs traditional TLS (ECDHE)
* Incorporate the key exchange into some existing TLS 1.3 scheme (X25519Kyber512 or similar?)
* Add authentication (this minimalist demo is currently vulnerable to MitM)

PS: A & B are doomed if the bartender is Mallory, but okay if the bartender is Shor. 😉