RAII in C? 🤔 One of my favorite things I miss when writing C

In C++, cleanup follows scope nicely.
In C, every allocation, locking, or socket operation usually comes with a matching cleanup path, and ...that's easy to miss

Here are three common patterns:
1️⃣ 𝐠𝐨𝐭𝐨 𝐜𝐥𝐞𝐚𝐧𝐮𝐩 (classic C)
👉https://godbolt.org/z/h478d1vdj
 𝚒𝚏 (𝚙𝚝𝚑𝚛𝚎𝚊𝚍_𝚖𝚞𝚝𝚎𝚡_𝚕𝚘𝚌𝚔(&𝚕𝚘𝚌𝚔) != 𝟶)
 𝚐𝚘𝚝𝚘 𝚌𝚕𝚎𝚊𝚗𝚞𝚙;
 𝚕𝚘𝚌𝚔𝚎𝚍 = 𝟷;

 𝚋𝚞𝚏𝚏𝚎𝚛 = 𝚖𝚊𝚕𝚕𝚘𝚌(𝚂𝙸𝚉𝙴);
 𝚒𝚏 (!𝚋𝚞𝚏𝚏𝚎𝚛)
 𝚐𝚘𝚝𝚘 𝚌𝚕𝚎𝚊𝚗𝚞𝚙;

2️⃣ __𝐚𝐭𝐭𝐫𝐢𝐛𝐮𝐭𝐞__((𝐜𝐥𝐞𝐚𝐧𝐮𝐩)) (GCC/Clang extention)
👉https://godbolt.org/z/azjooo96q
 𝙲𝙻𝙴𝙰𝙽𝚄𝙿(𝚞𝚗𝚕𝚘𝚌𝚔𝚙) 𝚙𝚝𝚑𝚛𝚎𝚊𝚍_𝚖𝚞𝚝𝚎𝚡_𝚝 *𝚙𝚕𝚘𝚌𝚔 = &𝚕𝚘𝚌𝚔;
 𝚒𝚏 (𝚙𝚝𝚑𝚛𝚎𝚊𝚍_𝚖𝚞𝚝𝚎𝚡_𝚕𝚘𝚌𝚔(𝚙𝚕𝚘𝚌𝚔) != 𝟶)
 𝚛𝚎𝚝𝚞𝚛𝚗 -𝟷;

 𝙲𝙻𝙴𝙰𝙽𝚄𝙿(𝚏𝚌𝚕𝚘𝚜𝚎𝚙)
 𝙵𝙸𝙻𝙴 *𝚏𝚒𝚕𝚎 = 𝚏𝚘𝚙𝚎𝚗(𝚏𝚒𝚕𝚎𝚗𝚊𝚖𝚎, "𝚠");
 𝚒𝚏 (!𝚏𝚒𝚕𝚎)
 𝚛𝚎𝚝𝚞𝚛𝚗 -𝟷;

3️⃣ 𝐝𝐞𝐟𝐞𝐫{} (proposed for C, used in `clang -fts-defer`)
👉https://godbolt.org/z/zTjfox3vv
𝚙𝚝𝚑𝚛𝚎𝚊𝚍_𝚖𝚞𝚝𝚎𝚡_𝚝 *𝚙𝚕𝚘𝚌𝚔 = &𝚕𝚘𝚌𝚔;
𝚍𝚎𝚏𝚎𝚛 { 𝚙𝚝𝚑𝚛𝚎𝚊𝚍_𝚖𝚞𝚝𝚎𝚡_𝚞𝚗𝚕𝚘𝚌𝚔(𝚙𝚕𝚘𝚌𝚔); }
𝚒𝚏 (𝚙𝚝𝚑𝚛𝚎𝚊𝚍_𝚖𝚞𝚝𝚎𝚡_𝚕𝚘𝚌𝚔(𝚙𝚕𝚘𝚌𝚔) != 𝟶)
 𝚛𝚎𝚝𝚞𝚛𝚗 -𝟷;

𝙵𝙸𝙻𝙴 *𝚏 = 𝚏𝚘𝚙𝚎𝚗("𝚍𝚊𝚝𝚊.𝚝𝚡𝚝", "𝚛");
𝚍𝚎𝚏𝚎𝚛 { 𝚏𝚌𝚕𝚘𝚜𝚎(𝚏); }

* `𝐜𝐥𝐞𝐚𝐧𝐮𝐩` attributes bring RAII-like semantics today, but rely on compiler extensions.
* `𝐝𝐞𝐟𝐞𝐫` aims to make scope-based cleanup a first-class language feature.

Personally, I find `defer` the most readable (keeps acquisition and cleanup together), but it's not really used, and didn't make it to the C23 standard (probably due to complex lambda captures?)

The cleanup attribute is becoming used in more and more projects, started with systemd and from 2023 in linux kernel as "scope-based cleanup helpers".
And with some convenience macros, the code really reads like RAII:
𝐠𝐮𝐚𝐫𝐝(𝐦𝐮𝐭𝐞𝐱)(&𝐥𝐨𝐜𝐤);

PS: Interestingly, it seems like there's been a shift and we might see the cleanup extension standardized, rather then `defer` + new lambda system, let's see...