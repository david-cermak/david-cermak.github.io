Vulnerability scanning without frontier models: Diversity wins and C is still hard, paper shows

Interesting article by researchers from AISLE and Masaryk University 🇨🇿:
👉 https://arxiv.org/pdf/2607.27030v1 (arXiv: 2607.27030)

This paper introduces HoF-Bench, a benchmark of 95 real CVEs previously discovered by AI across projects like OpenSSL, curl and GnuTLS and asks if today's *inexpensive open-weight models *can re-discover them.

Their best setup re-discovered 65 out of 95 vulnerabilities, without using frontier models for detection.

Interesting (and slightly unexpected) results:
* *Model diversity *beats model size. A portfolio of different models found more bugs than repeatedly running the single strongest model.
* Run your analyzer *multiple times. *One pass misses a lot, four repeated runs recovered 12–20 additional CVEs.
* More *context isn't always better. *Repository summaries produced only modest recall gains while generating many more findings to review.
* The *system matters *more than the model. Prompting, repeated scans, triage and orchestration had as much impact as the detector itself.

This feels like using multiple fuzzers or static analyzers: each has different blind spots, together they outperform a single tool.

Worth reading if you're interested in AI security or vulnerability discovery.