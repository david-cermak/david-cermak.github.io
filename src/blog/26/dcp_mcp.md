MCP on IoT devices? It works... but maybe embedded systems need something different.

Interesting paper published yesterday:
📄Dongxu Yang: "Device Context Protocol: A Compact, Safety-First Architecture for LLM-Driven Control of Constrained Devices"
🔗 https://arxiv.org/html/2605.26159v1
Introduces DCP: A protocol designed specifically for MCUs and embedded systems, with a very different philosophy than MCP:
1️⃣ Treats the LLM as fundamentally *untrusted* (a host-side Bridge rejects malformed or hallucinated calls before it reaches the device)
2️⃣ Capability mediation vs direct tool execution (capability scoping, range/type checks, dry-run evaluation, and units-as-types are protocol-layer primitives)
3️⃣ Tiny footprint: Reference firmware ~27.6 KB flash / 0.6 KB RAM on ESP32 (vs 80-120 KB compiled code for a minimal MCP server)
4️⃣ Deterministic, auditable behavior (designed so "tool misuse" on hardware can't silently become a real-world safety issue)
5️⃣ Empirical adversarial testing: 675 tool calls from five LLMs against six categories of adversarial prompts showed DCP rejects 100% of capability-escalation attempts and 78% of prompt-injection attempts, versus 0–1% for Raw MCP and IoT-MCP

AI protocols for embedded/industrial systems may need to look much more like safety-critical control systems than flexible cloud agent ecosystems. The authors position DCP as "the missing layer between MCP (which is moving toward enterprise SaaS connectivity) and the physical devices it does not reach."

💡 Interesting read for anyone working on embedded AI, ESP32/MCUs, robotics, industrial IoT, or agent tooling/security.
👉 MIT-licensed: https://github.com/device-context-protocol/dcp