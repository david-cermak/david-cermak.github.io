Obsidian LLM Wiki for personal knowledge infra

You've probably seen Andrej Karpathy's LLM Wiki idea: https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
Instead of classic RAG over raw files, let an LLM continuously maintain a structured knowledge base (raw/, wiki/, index.md) that compounds over time.

But the interesting part was the discussion below the gist:
1️⃣ Karpathy’s index.md vs Traditional RAG
Classic RAG re-discovers knowledge on every query. The wiki approach says: synthesize once, refine continuously, retrieve curated knowledge later. Better for long-lived projects where context should accumulate.
2️⃣ Retrieval vs Maintenance
Many people pointed out that retrieval is only half the problem. The harder part is keeping knowledge fresh, linked, and contradiction-free. In other words: not search quality, but memory quality.
3️⃣ Flat docs don’t scale
A recurring theme: dumping markdown files into a folder becomes keyword grep. Structured maps, links, indexes, and navigable knowledge graphs start to matter as projects grow.

And my personal favourite 👉 https://github.com/kytmanov/obsidian-llm-wiki-local
I’ve started using this project (Obsidian + local LLMs Wiki idea), and it feels really good: Private, ~fast, and 100% local, with Obsidian graph view as a bonus.
