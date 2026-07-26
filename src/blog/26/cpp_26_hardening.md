One of the most interesting parts of the C++26 safety story: 𝐋𝐢𝐛𝐫𝐚𝐫𝐲 𝐇𝐚𝐫𝐝𝐞𝐧𝐢𝐧𝐠

Library hardening converts certain undefined behavior in the standard library into detectable contract violations at runtime. The goal is simple:
* Recompile with a hardened standard library.
* Turn UB into deterministic failures.
* Catch bugs much earlier with 𝐧𝐨 𝐬𝐨𝐮𝐫𝐜𝐞-𝐜𝐨𝐝𝐞 𝐜𝐡𝐚𝐧𝐠𝐞𝐬.

All three major standard library implementations already ship vendor-specific hardening modes, but these mechanisms are all different/non-portable. P3471R4👉 https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3471r4.html standardizes what compilers already ship.

I put together a tiny header that checks whether your compiler's standard library advertises these hardening feature-test macros. Try it yourself (copy the oneliner from the first comment 👇 below)

```
curl -s https://raw.githubusercontent.com/david-cermak/system-security-lab/refs/heads/main/hardening/is_hardened.h | ${CC} -x c++ -c -
```
where `${CC}` is your compiler path (e.g. `export CC=gcc`)

Godbolt link 👉 https://godbolt.org/z/jGn5TbEWT

GCC's -𝚏𝚑𝚊𝚛𝚍𝚎𝚗𝚎𝚍 is a single flag that enables a set of security options without affecting ABI, currently including:
-𝙳_𝙵𝙾𝚁𝚃𝙸𝙵𝚈_𝚂𝙾𝚄𝚁𝙲𝙴=𝟹, -𝙳_𝙶𝙻𝙸𝙱𝙲𝚇𝚇_𝙰𝚂𝚂𝙴𝚁𝚃𝙸𝙾𝙽𝚂, -𝚏𝚝𝚛𝚒𝚟𝚒𝚊𝚕-𝚊𝚞𝚝𝚘-𝚟𝚊𝚛-𝚒𝚗𝚒𝚝=𝚣𝚎𝚛𝚘, -𝚏𝙿𝙸𝙴 -𝚙𝚒𝚎 -𝚆𝚕,-𝚣,𝚛𝚎𝚕𝚛𝚘,-𝚣,𝚗𝚘𝚠, -𝚏𝚜𝚝𝚊𝚌𝚔-𝚙𝚛𝚘𝚝𝚎𝚌𝚝𝚘𝚛-𝚜𝚝𝚛𝚘𝚗𝚐, -𝚏𝚜𝚝𝚊𝚌𝚔-𝚌𝚕𝚊𝚜𝚑-𝚙𝚛𝚘𝚝𝚎𝚌𝚝𝚒𝚘𝚗 (...and -fcf-protection=full for x86 GNU/Linux)

𝐂𝐨𝐦𝐩𝐢𝐥𝐞 𝐢𝐭 𝐬𝐚𝐟𝐞𝐫 becomes the first step in improving software security, before considering a rewrite.
Safety doesn't have to be a choice between "legacy C++" and "rewrite everything." It may just starts with a compiler upgrade, a newer standard library, and a couple of build flags.

𝐏𝐫𝐨𝐝𝐮𝐜𝐭𝐢𝐨𝐧 𝐝𝐚𝐭𝐚 𝐬𝐭𝐨𝐫𝐲: Google's experience applying hardened libc++ across "hundreds of millions of lines of C++" found over 1,000 bugs, including security-critical ones, with an average performance overhead of just 0.30%.