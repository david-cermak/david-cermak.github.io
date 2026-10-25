*TONTOU*👀: Timing is part of your security model

Interesting article in The Hacker News 👉 https://thehackernews.com/2026/08/new-interrupt-injection-attack-can.html

Researchers presented a new *interrupt injection attack* that reopens the speculative execution window and bypasses existing *Spectre v2 mitigations* on Intel and AMD CPUs. The PoC can leak Linux kernel memory without requiring privileges (only with the ability to run local code)

The interesting lesson here is about the time of neutralisation: A mitigation is only effective if it happens before speculation can do any damage. Missing this window means that the protection may no longer protect.