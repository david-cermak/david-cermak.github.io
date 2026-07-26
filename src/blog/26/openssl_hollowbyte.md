ICYMI: HollowByte: DoS with 11-byte packets (and an embedded lesson)

The recent HollowByte OpenSSL DoS demonstrates how a tiny packet can exhaust gigabytes of server memory. The trick is simple: send a TLS handshake claiming a huge payload, the server allocates memory for it, and the payload never arrives. Repeat ...and you end up with excessive allocations, heap fragmentation, and growing memory footprint.

A good reminder: "𝐍𝐞𝐯𝐞𝐫 𝐭𝐫𝐮𝐬𝐭 𝐚 𝐩𝐚𝐜𝐤𝐞𝐭'𝐬 𝐥𝐞𝐧𝐠𝐭𝐡 𝐟𝐢𝐞𝐥𝐝."

For embedded systems, it's often worse. Dynamic allocation is expensive or not allowed at all, one oversized allocation can break the rest of the system.

That's why many embedded networking stacks take a defensive approach:
* Cap the maximum packet size.
* Prefer fixed-size packet pools or preallocated buffers.
* Validate lengths before allocating memory.
* Grow buffers only when absolutely necessary.

This isn't just about saving RAM, but also keeping memory usage predictable. Untrusted input shouldn't dictate your footprint.
💡 Sometimes, the "embedded way" may just be the safer way.

Read the hackernews article 👉 https://thehackernews.com/2026/07/openssl-hollowbyte-flaw-could-freeze.html