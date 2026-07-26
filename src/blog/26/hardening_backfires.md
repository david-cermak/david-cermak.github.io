When Hardening Backfires…

Back in 2020, Google's Project Zero showed how vendor hardening introduced entirely new kernel vulnerabilities:
https://projectzero.google/2020/02/mitigations-are-attack-surface-too.html

It's now more relevant than ever: "𝐌𝐢𝐭𝐢𝐠𝐚𝐭𝐢𝐨𝐧𝐬 𝐚𝐫𝐞 𝐚𝐭𝐭𝐚𝐜𝐤 𝐬𝐮𝐫𝐟𝐚𝐜𝐞, 𝐭𝐨𝐨" (credit: Jann Horn) deserves more attention, because:
* Security reports are more frequent due to easier assessment using AI tools.
* Recent Rust coreutils incompatibility with `cp` 👉https://www.phoronix.com/news/Rust-Coreutils-cp-Ubuntu-Images

Some examples where well-intentioned hardening created new attack surface:

1️⃣ 𝐀𝐩𝐩𝐥𝐞 𝐏𝐀𝐂 𝐁𝐲𝐩𝐚𝐬𝐬 𝐯𝐢𝐚 𝐑𝐏𝐀𝐂 (CVE-2025-31201)
👉 https://blog.epsilon-sec.com/cve-2025-31201-rpac.html

Hardware Pointer Authentication Codes (PAC) to cryptographically protect function pointers against control-flow hijacking.

𝐁𝐚𝐜𝐤𝐟𝐢𝐫𝐞: Apple's instrumentation library `libRPAC.dylib` interposes `dlsym` and stores swizzled ObjC method pointers, both signed with key A, diversifier zero, in writable memory. An attacker with read/write primitives performs a substitution attack: swap a writable pointer with the `dlsym` interposer (same signing schema), then call `dlsym` to mint arbitrary signed pointers → fully neutralizing hardware PAC.

2️⃣ Windows NTLM Reflection Bypass (CVE-2025-33073)
👉 https://www.synacktiv.com/en/publications/ntlm-reflection-is-dead-long-live-ntlm-reflection-an-in-depth-analysis-of-cve-2025

Strict loopback detection to prevent NTLM reflection/relay privilege escalation.

𝐁𝐚𝐜𝐤𝐟𝐢𝐫𝐞: The detection logic parsed target names to decide if authentication was local. By registering a DNS record with marshalled target information, researchers tricked the SMB client into treating a remote relay server as localhost → causing LSASS to hand over a SYSTEM token via the mitigation's own local-auth shortcut.

3️⃣ Linux Kernel Defenses Amplify Side Channels (USENIX Security '25)
👉https://www.usenix.org/conference/usenixsecurity25/presentation/maar-kernel

Maar et al. showed that certain kernel defenses force fine-grained 4 kB page mappings (instead of 2 MB), creating observable TLB contention patterns. Attackers exploit this via Evict+Reload to leak kernel object locations and achieve reliable privilege escalation.

𝐓𝐚𝐤𝐞𝐚𝐰𝐚𝐲𝐬
* Every line of security code is also attack surface.
* Evaluate hardening not only for what it blocks, but what new signals it exposes.
* Simplicity is a security feature → reducing code and complexity often beats layering more defenses.

---

𝐃𝐞𝐦𝐨: 𝐒𝐭𝐚𝐜𝐤 𝐂𝐚𝐧𝐚𝐫𝐲 𝐚𝐬 𝐚𝐧 𝐎𝐫𝐚𝐜𝐥𝐞

To better understand the idea, I wrote a small demo that mirrors the paper's concept in userspace. Instead of attacking the mitigation directly, it shows how a stack canary can become an oracle: by repeatedly observing whether a forked process crashes or exits normally, the attacker leaks the canary byte-by-byte, then the saved return address, and finally recovers the PIE/ASLR base ->all without breaking the randomness itself.
👉 https://godbolt.org/z/Mj933MdcT
👉 https://github.com/david-cermak/system-security-lab/blob/main/hardening/07_defense_as_attack_surface.c
