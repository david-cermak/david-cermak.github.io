Tracking firmware memory with hashtag#Membrowse in libssh/embedded

Embedded folks know this too well: Flash and RAM usage is a very important metrics...

Here's my embedded port of hashtag#libssh (ESP-IDF & Zephyr), so you can run 𝐬𝐬𝐡𝐝 on-device 👉 https://github.com/david-cermak/libssh
Crypto choices (classic curve25519 vs post-quantum hybrids like SNTRUP761 or ML-KEM) change flash size, heap, and stack by tens of kilobytes.
Using Membrowse👉https://membrowse.com helps me to keep that visible on every change.

𝐖𝐡𝐲 𝐢𝐭 𝐦𝐚𝐭𝐭𝐞𝐫𝐬 𝐟𝐨𝐫 𝐞𝐦𝐛𝐞𝐝𝐝𝐞𝐝
Desktop SSH stacks rarely care if a KEX path costs another 30 KB of program or 40 KB of stack. On a constrained MCU that margin is the difference between a working session and a stack overflow. Manual analysis help, but they go stale. Continuous footprint tracking catches regressions when you enable an algorithm, bump a dependency, or tweak the app.

𝐇𝐨𝐰 𝐢𝐭 𝐢𝐬 𝐰𝐢𝐫𝐞𝐝
Three GitHub Actions workflows cover the lifecycle:
* 𝐌𝐞𝐦𝐛𝐫𝐨𝐰𝐬𝐞 𝐌𝐞𝐦𝐨𝐫𝐲 𝐑𝐞𝐩𝐨𝐫𝐭: On every pull request and every push to `main`, CI builds the examples then runs `membrowse/membrowse-action` against each ELF, map file, and linker script.
* 𝐌𝐞𝐦𝐛𝐫𝐨𝐰𝐬𝐞 𝐏𝐑 𝐂𝐨𝐦𝐦𝐞𝐧𝐭: When a PR report finishes successfully, a follow-up job posts a memory summary on the pull request via `membrowse-action/comment-action`. Reviewers see flash/RAM deltas without digging through build logs.
* 𝐎𝐧𝐛𝐨𝐚𝐫𝐝 𝐭𝐨 𝐌𝐞𝐦𝐛𝐫𝐨𝐰𝐬𝐞: A manual workflow that walks recent commits and backfills historical snapshots so trends are not limited to "from the day we enabled CI."

𝐖𝐡𝐚𝐭 𝐲𝐨𝐮 𝐠𝐞𝐭
* Per-commit memory reports for real firmware images
* PR comments that make size changes part of review, next to functional diffs
* A historical baseline so gradual growth (or a sudden spike from a crypto option) is obvious

Big thank you to Michael Rogov Papernov 👏 for this great tool and for helping me integrate it to the project!