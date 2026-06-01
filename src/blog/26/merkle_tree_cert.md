Google squeezed 15 kB into 700 B: 🤔The *real *embedded lesson

We all saw the headlines about this quantum-safe HTTPS work. 
But the interesting part for embedded folks isn't new crypto; it’s the protocol redesign!

Google's Merkle Tree Certificates shrink authentication data in the TLS handshake from ~15 kB to ~700 B by replacing multiple signatures with a *Merkle inclusion proof.*
Instead of sending a full certificate chain, the client receives:
* Certificate
* Merkle proof
* Signed tree root
The verification means recomputing the Merkle path: Just hashes, no extra signatures.

And what's there for Embedded?
1️⃣ Hash trees vs. signatures at scale
 - one signature protects millions of entries.
2️⃣ Bandwidth vs. CPU load
 - a few hash operations are trivial (even for MCUs), large certificates are not.
3️⃣ Transparency logs become infrastructure
 - Certificate Transparency is evolving from an auditing tool into the core PKI primitive.
4️⃣ Post-quantum migration is architectural
 - it’s not just "swap algorithms", it’s redesigning protocols.

I built a small Merkle-tree lab demonstrating the idea using Google’s Trillian transparency logs👉https://github.com/david-cermak/merkle-tree-lab
It shows how to log certificates, generate inclusion proofs, and verify a simple “Merkle certificate”.

Embedded developers often ignore hashtag#PQC (understandably, perhaps...), but this part we shouldn’t miss.