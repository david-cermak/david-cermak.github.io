📘 *Book review*: "The C++ Programmer's Mindset" by Sam Morley

I read this book recently and wanted to share a few thoughts from an embedded developer's perspective.  
Full review with code snippets and charts 👉 https://david-cermak.github.io/blog/25/programmers-mindset

*Why this book is worth your weekend* 🧠  
On the surface it looks like a data‑science / HPC book—differential equations, clustering, GPUs, Linux clusters. But underneath, it’s really a guide to computational thinking in modern C++: decomposition, abstraction, pattern recognition, and algorithm design that transfer surprisingly well to any field, embedded systems included.

*The parts that stayed with me* ⚙️  
- Treat `std::vector` and RAII as the default, and only reach for fancier containers or custom allocators when measurements justify it.  
- Think hard about data layout (AoS vs SoA) and cache/locality; that same mindset applies to how we organize sensor buffers, telemetry, and state machines.  
- Use tools like Google Benchmark, perf, and friends (or MCU‑equivalents) to measure first, then optimize—the “measure twice, cut once” idea shows up in every chapter.

*Bonus chapters* 🧪  
I really liked the clear treatment of testing layers (unit / integration / end‑to‑end with gtest/gmock) and error handling (failures vs errors, `std::optional` and `std::expected` instead of everything being an exception or an error code). It’s very much “grown‑up C++” rather than clever template tricks for their own sake.

There’s a benchmark comparing single‑threaded AVX2, multithreaded, and CUDA for a simple axpy. For small vector sizes, the plain single‑threaded CPU wins—overhead and bandwidth dominate. It’s a great reminder that intuition about “more cores” or “GPU = faster” is often wrong without measurements.

There’s also a great matrix‑multiplication chapter: you start from a plain triple‑nested loop and then add simple blocking to respect cache lines, and suddenly you’re ~2× faster with the same big‑O complexity. The best part is that the real implementations and Google Benchmark tests are in the companion GitHub repo, so you can clone, tweak, and profile the code yourself instead of treating it as a purely theoretical example. 📈

*Final verdict* ✅  
If you’re an embedded C++ dev who wants to think more like a performance‑minded “systems” programmer—without abandoning microcontrollers—this is a very solid read. It won’t replace your datasheets or RTOS manuals, but it will sharpen how you decompose problems, pick data structures, and argue about performance with numbers instead of vibes. 😉

PS: The “real‑life” case study in the book is about tracking mysterious rubber duck sightings around the world—yes, the same rubber duckies we talk to when debugging. 🦆 You ingest sightings from emails, CSVs, and JSON APIs, normalize them, and build a CLI that clusters hot spots where the ducks are congregating. It’s a fun, slightly absurd brief that still forces you to practice serious C++: file parsers, data pipelines, k‑means on a sphere, error handling, and performance tuning. In other words, you get to ship a proper tool while your rubber duck gets a starring role in the spec.

> 🙏 Big thanks to Packt and Mansi Shah for the Early Review Copy, and to Sam Morley for writing a book that’s both an excellent learning resource and a very practical guide to modern C++ in the real world.