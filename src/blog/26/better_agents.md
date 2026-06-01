Better AI agents🤔? Less AI, more determinism

It’s been some time since the Claude Code source leak, but there are still valuable lessons emerging...
An interesting repo by VILA Lab👉https://github.com/VILA-Lab/Dive-into-Claude-Code

Their takeaway: "Only 1.6% of CC codebase is AI decision logic. The other 𝟗𝟖.𝟒% 𝐢𝐬 𝐝𝐞𝐭𝐞𝐫𝐦𝐢𝐧𝐢𝐬𝐭𝐢𝐜 𝐢𝐧𝐟𝐫𝐚𝐬𝐭𝐫𝐮𝐜𝐭𝐮𝐫𝐞… The agent is a simple while-loop..."

AI agents may win less through smarter prompts/models, and more through better systems engineering:
• The real infra is orchestration: permissions, tool routing, retries, recovery
• Context management: five-layer compaction pipeline to fit long-running work into model context windows.
• Subagents: specialized delegated agents with isolated workspaces to expand without polluting the main context.

My takeaway: The future AI products may look less like *one super-model* and more like robust operating systems wrapped around models.
