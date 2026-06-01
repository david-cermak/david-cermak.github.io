QUIC Protocol on Embedded Devices

Last weekend I talked at Installfest about QUIC protocol on embedded (with a demonstration of Cloudflare tunnel on ESP32).

QUIC is widely known web protocol, but it offers several interesting advantages to embedded/IoT applications:
• Fast connection establishment: Reduced round-trip time compared to TCP+TLS handshake
• Multiplexed streams: Eliminates head-of-line blocking at transport layer
• Connection migration: Connection IDs allow seamless network transitions (WiFi ↔ cellular)
• Many tunnelling/P2P stacks use QUIC transport: As demonstrated  with cloudflared running on ESP32.
The protocol integrates TLS 1.3 into the transport layer over UDP.

Projects:
• Picoquic port to ESP-IDF👉 https://lnkd.in/dzt-qcWK
• Minimal C++ version of cloudflared👉 https://lnkd.in/daHSutEd
See the full presentation👇

---


# Quick intro to QUIC • Embedded perspective



&nbsp;
&nbsp;
&nbsp;
&nbsp;

### **David Cermak**  • Embedded developer


---


![quic-vs-tls](overview.png)

## Agenda

* QUIC introduction
* Embedded angle
  - libraries
  - footprint
  - demo: cloudflared + picoquic

---

## Why QUIC

- **Classic HTTPS**: TCP brings reliability; **TLS** adds encryption — two separate handshakes and layers.
- **QUIC**: runs over **UDP**, integrates **TLS 1.3** into connection setup — **CRYPTO frames**, not TLS records on the wire (RFC 9001).
- **Goals**:
  1) **Faster** establishment (often **1 RTT** for first flight of app data vs TCP+TLS stacked).
  2) **Multiplexed streams** without TCP **head-of-line blocking** across streams.
  3) **Connection IDs** → path can change (**connection migration**).

---

![tls1.2](tls1.2.png)

---

![quic-sequence](quic-sequence.png)

---

## TCP + TLS vs QUIC

<div class="compare">
<div class="compare-box">
<h4>Traditional (TCP + TLS)</h4>
<div class="packet-stack">
<div class="layer ip">IP</div>
<div class="layer udp">TCP (reliability, congestion, byte streams)</div>
<div class="layer quic-p">TLS record layer + handshake / app data</div>
</div>
<p class="small">Two big concerns: TCP handshake <em>then</em> TLS. Layers are separate on the wire.</p>
</div>
<div class="compare-box">
<h4>QUIC (UDP)</h4>
<div class="packet-stack">
<div class="layer ip">IP</div>
<div class="layer udp">UDP (datagrams)</div>
<div class="layer quic-h">QUIC packet header (long or short)</div>
<div class="layer quic-p">Encrypted payload = <strong>frames</strong> (CRYPTO, STREAM, ACK, …)</div>
</div>
<p class="small">TLS 1.3 handshake bytes live in <strong>CRYPTO frames</strong>; QUIC encrypts its own packets.</p>
</div>
</div>

---


## Layering on the wire (packet structure)

One **IP** packet → one **UDP** datagram → **one or more QUIC packets** (often **coalesced** during handshake) → each decrypted QUIC packet → **sequence of frames**.

<div class="packet-stack" style="max-width: 520px;">
<div class="layer ip"><strong>IP header</strong> · src/dst addresses</div>
<div class="layer udp"><strong>UDP header</strong> · ports</div>
<div class="layer quic-h"><strong>QUIC long or short header</strong> · type, version / DCID, packet # (partially protected)</div>
<div class="layer quic-p"><strong>Payload</strong> (encrypted): <code>FRAME</code> · <code>FRAME</code> · … &nbsp;(CRYPTO, STREAM, ACK, …)</div>
</div>

---
## 0-RTT — speed vs replay risk

<div class="zertt">
<div class="panel">
<h4>First connection (cold)</h4>
<p style="margin:0.2em 0;"><strong>Client → Server</strong></p>
<p style="margin:0.15em 0;">Initial + CRYPTO (ClientHello) …</p>
<p style="margin:0.15em 0;"><strong>Server → Client</strong></p>
<p style="margin:0.15em 0;">Handshake + 1-RTT keys …</p>
<p style="margin:0.15em 0;"><strong>Then</strong> app STREAM (1-RTT)</p>
</div>
<div class="panel">
<h4>Resume (ticket / PSK cached)</h4>
<p style="margin:0.2em 0;"><strong>Client → Server</strong></p>
<p style="margin:0.15em 0;"><strong>0-RTT packet</strong> + early STREAM (if accepted)</p>
<p style="margin:0.15em 0;"><strong>Server</strong> may accept or <strong>reject</strong> early data</p>
<p style="margin:0.15em 0;"><span class="rt">Replay</span> of 0-RTT data possible — design idempotent ops</p>
</div>
</div>

---


![0-RTT replay](quic-replay.png)

--- 

## 0-RTT — speed vs replay risk

- **0-RTT** = **application data in the first flight** when prior **session state** exists (tickets / PSK).
- **Replay** is possible — prefer **idempotent** or safe operations at the app layer unless you add defenses.
- **Frame rules**: 0-RTT **cannot** carry ACK, CRYPTO, HANDSHAKE_DONE, NEW_TOKEN, PATH_RESPONSE, RETIRE_CONNECTION_ID, …
- **Edges / CDNs** (e.g. Cloudflare) often **block obvious non-idempotent** 0-RTT (e.g. POST/PUT), but **the origin app** still decides what is safe — “GET-like” traffic can still have side effects.
- **RFC 8470**: intermediaries may add **`Early-Data: 1`** on forwarded requests so the **origin** knows they arrived in 0-RTT; the origin can answer **`425 Too Early`** so the client **retries after** the handshake (1-RTT path).

---

## Embedded angle (libraries)

* ngtcp2 (C)
* picoquic (C)
* quiche (Rust)
* esp-http3 (C++)

---

## Embedded angle (constraints)

- **Footprint**: TLS 1.3 + UDP processing + frame parsing — **RAM** and **flash** budget matter on MCUs.
- **Integration**: not “pipe stream into `mbedtls_ssl_write`” 
    - need APIs that expose **traffic secrets** and feed **CRYPTO** / packet crypto (RFC 9001).

---

## This repo: **picoquic**

Two **QUIC backends** + **ESP-IDF** examples:

| Backend | Notes |
|---------|--------|
| **picoquic** (C) | Original focus; picotls; port/integration |
| **esp-http3** (C++) | QUIC + HTTP/3; can run “plain QUIC” for non-HTTP (e.g. MQTT) |

**Examples** (`examples/`):

- **`mqtt`** — `esp-mqtt` over QUIC via **esp-http3** (`impl/esp-http3`), custom transport  
- **`pico-mqtt`** — same idea with **picoquic**  
- **`simple`** — minimal HTTP/3 client (**esp-http3**)  
- **`pico-simple`** — minimal **picoquic** sample  

**Licensing**: repo **MIT**; `deps/esp-http3` **Apache-2.0** (see component).

---

## Footprint comparison

![lib-compare](quic-lib-compare.png)


---

## Footprint comparison

Details: https://github.com/david-cermak/picoquic

NGTCP2:
```
┃ Archive File                    ┃ Total Size ┃  DRAM ┃ .bss ┃ Flash Code ┃  .text ┃ Flash Data ┃ .rodata ┃
┡━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━╇━━━━━━━╇━━━━━━╇━━━━━━━━━━━━╇━━━━━━━━╇━━━━━━━━━━━━╇━━━━━━━━━╇
│ libwolfssl__wolfssl.a           │     447531 │  1984 │ 1920 │     388820 │ 388820 │      56727 │   56727 │
│ libngtcp2.a                     │     185014 │   116 │   24 │     178528 │ 178528 │       6370 │    6370 │
```

---

## Demo: Cloundflared tunnel

![cloudflared](cloudflared.png)

---

## Further reading

- **RFC 9000** — QUIC transport · **RFC 9001** — TLS mapping · **RFC 9002** — loss / congestion  
- **QUIC Illustrated** (Cloudflare) — https://quic.xargs.org/ — wire format intuition  
