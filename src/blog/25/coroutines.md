💥 *I blew my stack!*

Embedded folks know this too well -- so we increase stack size until the problem goes away...

But what if we *await *instead? Let's explore *C*++20 *coroutines: *a way to write async code that looks like sync code, without the stack explosion.

I built a simple HTTP server two ways:
* Classic style: 1 FreeRTOS task per client
* Coroutine style: event loop + awaitable workers
👉 https://lnkd.in/ercXQ3ar

*The backstory: *I've been playing with Kafka client and the original code uses _̳_̳t̳h̳r̳e̳a̳d̳ (TLS) to stash state per thread. Works fine… but had to set the FreeRTOS stacks sizes too big even for small housekeeping tasks.
Coroutines would come in useful

What you think:
 ⚡ Are C++20 coroutines a game-changer for embedded development?
 🤔 Or too abstract/complex for embedded engineers to adopt?