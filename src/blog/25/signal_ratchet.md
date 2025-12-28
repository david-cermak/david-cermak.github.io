🔐What can IoT security learn from Signal’s latest post-quantum **"tripple ratchet"**?

![signals_tripple_ratchet](/images/signals-ratchet.jpg)

Signal’s latest PQC upgrade implements a hybrid “triple ratchet”: each message key comes from both the classic ECC-based double ratchet and a new lattice-KEM. In practice Signal uses a ML-KEM in parallel with its ECDH ratchet, so an attacker must break both layers to decrypt messages.
To fit the large KEM keys into chat packets, Signal shards (erasure-codes) each KEM public key into small chunks sent across messages.

Embedded IoT can follow this pattern. Use a hybrid key exchange (ML-KEM plus ECDH) at session setup. But budget for constraints: ML-KEM‑768 needs ~1.2 KB public keys vs ~32 B for ECC, so favor smaller params (ML-KEM 512) or stream keys over time. Chunking or lightweight buffering (as Signal does) can overcome limited RAM. Crucially, build in agility and fallback: allow a device to negotiate classical mode and upgrade later, as recommended by PQ migration guides. For example, an ESP32-based channel might use a PQ-augmented Diffie-Hellman handshake with AES-GCM ratcheting, rotating each key. This yields today’s forward secrecy and future quantum-safety; essentially a Signal-like secure firmware channel for constrained devices.

📖Read more about Signal's double/triple ratchet algorithm👉 https://signal.org/docs/specifications/doubleratchet/
- Diagram below outlines DH ratchet idea
- Double Ratchet combines it with Symmetric-Key ratchet
- Triple Ratchet adds Sparse Post-Quantum Ratchet

🛜Experimental ESP32 ML-KEM component based on liboqs👉https://github.com/david-cermak/upqc-lab/tree/main/components/liboqs_mlkem
- With example of dedicated PQC channel (based on ML-KEM-512 + AES-GCM implementing forward secrecy)
- Full X25519MLKEM768 key agreement implementation on ESP32

💬Do you think our IoT devices should adopt forward secrecy by default? Is a hybrid, PQ-resistant "triple ratchet" realistic for your firmware/update channels?