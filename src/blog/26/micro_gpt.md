250 LOC MicroGPT🤔 ...and the clones

A few days ago Andrej Karpathy published a 243-line, dependency-free Python implementation of a tiny GPT-style Transformer.
Naturally, clones started popping up in C, JS, Rust, C++, PHP, ...

So… sorry, @̳*network, *I had too🙂
🔗https://github.com/david-cermak/microgpt
1️⃣ Train on your PC (train-py)
2️⃣ Export weights into data.c
3️⃣ Flash your ESP32
4️⃣ In esp-console, type: infer tcp_
 * tcp_reconnect
 * tcp_bind_ext

But jokes aside🔗 https://gist.github.com/karpathy/8627fe009c40f57531cb18360106ce95 this tiny project is better than most tutorials. It shows the pure minimum of how GPT works under the hood. If you want to understand Transformers, read the original implementation by Andrej Karpathy, it is brilliant👏