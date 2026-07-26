𝐎𝐟𝐟𝐞𝐧𝐬𝐢𝐯𝐞 AI scales with tokens. 𝐃𝐞𝐟𝐞𝐧𝐬𝐢𝐯𝐞 with discipline. 𝐂𝐨𝐬𝐭 determines which is useful.

"Beyond Success Rate: Cost-Aware Evaluation of Offensive and Defensive Security Agents" by Paul Kassianik, Blaine Nelson, Yaron Singer
👉 https://arxiv.org/html/2607.15263v2 (arXiv: 2607.15263)

This paper takes a practical approach on evaluating AI agents in security benchmarks. The idea is simple: Every reasoning step, tool call, telemetry query, has a 𝐜𝐨𝐬𝐭...

And the results look really interesting:

* 𝐎𝐧 𝐨𝐟𝐟𝐞𝐧𝐬𝐢𝐯𝐞 CTF challenges, GPT-5.5 solved 94.1% of tasks, while DeepSeek v4 Flash reached 86.4% at a competitive cost. More compute generally translated into better performance.

* 𝐎𝐧 𝐝𝐞𝐟𝐞𝐧𝐬𝐢𝐯𝐞 SOC investigations, the pattern flipped. Claude Opus 4.8 achieved the highest score (93.9%) using just 603 tool calls, while DeepSeek v4 Flash made nearly 5,000 tool calls yet plateaued around 74%. More reasoning and more tools didn't necessarily produce better results.

Check out more benchmarks/graphs 👉https://evals.frontier.security/
Offense rank ≠ defense rank

PS: Cost per successful task and operational efficiency may be the metrics that actually matter in real-world deployments.