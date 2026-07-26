𝐬𝐭𝐝::𝐞𝐱𝐩𝐞𝐜𝐭𝐞𝐝: One of my favorite C++23 features for embedded development

For years we've been using either integer error codes or output parameters (or exceptions, which embedded devs don't 𝚕̶𝚒̶𝚔̶𝚎̶ use)

𝐬𝐭𝐝::𝐞𝐱𝐩𝐞𝐜𝐭𝐞𝐝<𝐓, 𝐄> finally gives us a clean way to return either a value or an error without dynamic allocation or exceptions.

👉 https://godbolt.org/z/zPnaPYK6v (godbolt link)

𝚜𝚝𝚍::𝚎𝚡𝚙𝚎𝚌𝚝𝚎𝚍<𝚞𝚒𝚗𝚝𝟹𝟸_𝚝, 𝚂𝚎𝚗𝚜𝚘𝚛𝙴𝚛𝚛𝚘𝚛> 𝚛𝚎𝚊𝚍_𝚜𝚎𝚗𝚜𝚘𝚛() {
 𝚒𝚏 (!𝚑𝚠_𝚛𝚎𝚊𝚍𝚢())
 𝚛𝚎𝚝𝚞𝚛𝚗 𝚜𝚝𝚍::𝚞𝚗𝚎𝚡𝚙𝚎𝚌𝚝𝚎𝚍(𝚂𝚎𝚗𝚜𝚘𝚛𝙴𝚛𝚛𝚘𝚛::𝚃𝚒𝚖𝚎𝚘𝚞𝚝);
 𝚛𝚎𝚝𝚞𝚛𝚗 𝟺𝟸;
}
---

This looks very familiar for 𝐑𝐮𝐬𝐭 devs, but here's a difference:
Rust's Result<T, E> is a language feature. The compiler forces you to handle errors using match or the ? 𝐨𝐩𝐞𝐫𝐚𝐭𝐨𝐫.
C++'s std::expected is a library type. The language trusts you, which means this:

𝚊𝚞𝚝𝚘 𝚛𝚎𝚜𝚞𝚕𝚝 = 𝚛𝚎𝚊𝚍_𝚜𝚎𝚗𝚜𝚘𝚛();
𝚊𝚞𝚝𝚘 𝚟𝚊𝚕𝚞𝚎 = *𝚛𝚎𝚜𝚞𝚕𝚝;  // 𝚄𝚗𝚍𝚎𝚏𝚒𝚗𝚎𝚍 𝚋𝚎𝚑𝚊𝚟𝚒𝚘𝚛

Can be UB/you must check 𝚒𝚏 (𝚛𝚎𝚜𝚞𝚕𝚝) first!
---

C++23 also introduced 𝐦𝐨𝐧𝐚𝐝𝐢𝐜 𝐨𝐩𝐞𝐫𝐚𝐭𝐢𝐨𝐧𝐬 like 𝚊𝚗𝚍_𝚝𝚑𝚎𝚗(), 𝚝𝚛𝚊𝚗𝚜𝚏𝚘𝚛𝚖(), and 𝚘𝚛_𝚎𝚕𝚜𝚎(), which let you build clean processing pipelines:

𝚊𝚞𝚝𝚘 𝚟𝚊𝚕𝚞𝚎 = 𝚛𝚎𝚊𝚍_𝚜𝚎𝚗𝚜𝚘𝚛()
 .𝚊𝚗𝚍_𝚝𝚑𝚎𝚗(𝚌𝚊𝚕𝚒𝚋𝚛𝚊𝚝𝚎_𝚍𝚊𝚝𝚊)
 .𝚊𝚗𝚍_𝚝𝚑𝚎𝚗(𝚌𝚘𝚗𝚟𝚎𝚛𝚝_𝚝𝚘_𝚌𝚎𝚕𝚜𝚒𝚞𝚜);

If any step fails, the error propagates automatically, keeping the code flat and readable.
---

𝐬𝐭𝐝::𝐞𝐱𝐩𝐞𝐜𝐭𝐞𝐝 is one of the Modern C++ features that improves readability, and safety with zero-overhead abstraction.

My recommendation for embedded devs:
* Mark std::expected-returning functions as [[𝚗𝚘𝚍𝚒𝚜𝚌𝚊𝚛𝚍]].
* Wrap legacy C APIs with thin std::expected adapters.