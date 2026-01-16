"cloud vs. device"? No, "edge + device"

I came across an interesting paper on collaborative Edge-IoT AI for intrusion detection👉https://www.mdpi.com/1424-8220/26/2/356

The authors show that you don't need a full transformer on-device: a compressed 41 MB "EdgeBERT" model generates semantic embeddings at the edge, while a 137 KB classifier runs on the IoT device (reaching ~99.9% accuracy with sub-70 ms latency).
What I found most interesting is the architectural argument: Offloaded embeddings as a middle ground between fully on-device models and cloud-only AI.

💬What you think? Will edge-AI evolve toward collaborative embedding pipelines like this, or will most intelligence continue to drift back to centralized cloud services?
