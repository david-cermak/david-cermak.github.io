🧠 *Semantic *history *search *in your command line
I replaced Bash's default reverse search (Ctrl+R) with a semantic search powered by vector embeddings and FAISS.

Instead of substring matching through .*bash*_*history, *commands are indexed as embeddings via sentence-transformers and searched by meaning.
So typing "todo" can return "*grep fixme"; *or "flash esp32" finds "*idf.py app-flash".*

💡*How it works:*
* Bash hook indexes each command as an embedding (skips trivial ones)
* *fzf *in live mode calls a Python search helper using FAISS nearest-neighbor lookup
* Selected command: injected back into the shell prompt
* Optional in-memory server keeps the model and index warm, so queries feel instant after the first one.

Repo & setup 👉 https://github.com/david-cermak/cl-utils/tree/main/hist#semantic-bash-history-search

PS: Apologies to the embedded folks: This one’s not about microcontrollers, but at least it’s about (vector) "*embeddings" *😄