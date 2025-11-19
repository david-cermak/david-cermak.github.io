![Cover of C++ Memory Management book](/images/cpp-book.png)

## Why this book matters for embedded C++

I read this book and would like to provide some feedback from an embedded developer's perspective. There's continuous discussion about using C/C++/Rust in the future for embedded systems. This is a must-read for everyone who votes for C++.

The book delivers one of the clearest, most systematic treatments of C++'s memory model I've encountered, aimed at people who care about how bytes move, not just how APIs look. As someone working in embedded systems, I came away thinking that if you want to seriously advocate for C++ on your next project, reading and applying this book is part of the entrance fee.

## A fairy-tale about lifetimes, not dragons

The book reads naturally as a technical narrative—and indeed there's an epic Orcs+Elves battle waiting for readers in chapter 10. The structure works in its favor: the first half builds a foundation, moving from raw storage and object representations to RAII, ownership types, and exception safety in small, verifiable steps. Each chapter introduces one new idea about storage, lifetime, or ownership, then carefully shows how it composes with the previous ones.

The second half then applies this foundation to concrete use-cases: containers, allocators, overloading and exception safety, and optimizations on simple examples such as custom leak detectors or a hand-rolled `std::vector`-like container. If you're already comfortable with C++, this is the part I would particularly recommend. And if you consider yourself a C++ guru, the final summary chapter is also worth reading on its own—it condenses the core principles and trade-offs into a short, dense recap.

From an embedded perspective, this is where the book becomes directly actionable. The chapter that overloads `new`/`delete` to implement a leak detector feels very familiar to anyone who has ever tried to track allocations on a constrained device. The examples show how to sneak bookkeeping data in front of user allocations, how to keep statistics about what was allocated, and why you must pay attention to alignment and over-allocation when you do so. It is the kind of "engineering-grade" leak tracking that you can actually imagine running, at least in diagnostics builds, on a real product.

The material on placement `new` and arena-style allocation is even more essential for embedded work. Mapping real hardware to objects, carving out arenas from statically reserved memory, and avoiding fragmentation are core techniques in many firmware architectures. The book walks through these patterns carefully enough that you can see where the sharp edges are, rather than just copying a snippet from the internet and hoping it behaves on your MPU.

There is also a thoughtful exploration of "deferred reclamation"—essentially, garbage-collection-like patterns in a language that does not promise a GC. For deeply embedded systems, you probably won't be running a full collector in the hot path, but the idea of deferring cleanup to well-defined phases (for example, reclaiming aggressively before entering deep sleep so you wake up to a clean slate) maps surprisingly well to low-power design.

Finally, the sections that reimplement standard containers and discuss allocator-aware designs are particularly relevant for teams that avoid `std::vector` in production. Many embedded developers are wary of the standard containers because they allocate implicitly and can throw exceptions. By building simplified, specialized versions, the book shows how to get `vector`-like ergonomics while controlling allocation strategies, small-size optimizations, and failure modes. The discussion of allocator-aware containers—both traditional and polymorphic allocators—speaks directly to safety-critical environments where you need to prove where every byte comes from and where it goes.

## What the author has to say—and why it sticks

Beyond the technical depth, the book is full of short lines that crystallize its philosophy about memory and correctness.

One of the early chapters on RAII contains the observation that "this has led some luminaries to claim that the most beautiful instruction in C++ is }, the closing brace." That might sound like a joke, but it neatly captures a central theme: properly structured scopes and destructors are the core mechanism by which C++ keeps resource management predictable. When you start to see each `}` as a boundary where invariants are restored and resources are reclaimed, code review and debugging become much more systematic.

In the discussion of low-level casts, the author notes that "sometimes, you just have to make the compiler believe you." It's a very compact way of describing `reinterpret_cast` and related facilities: tools for when you genuinely know more about the concrete memory representation than the type system can express. The book is careful here—the tone is not "go wild," but "understand exactly which guarantees you are stepping outside of, and why."

Ownership and API design are summarized with the line "function signatures talk to us. It's better if we pay attention." This is where the book strongly argues for encoding ownership in types: references, raw pointers, `unique_ptr`, `shared_ptr`, and custom smart pointers as explicit contracts instead of informal comments. In practice, this chapter reads like a guide for turning your codebase into something humans and compilers can reason about in the same way. Many bugs are basically caused by developers ignoring what the code has been politely telling them all along.

A particularly useful framing appears in the type-system chapter: "the type system is designed to protect us from accidents and make reasonable well-written code work well. It will protect you from Murphy, the accidents that happen, not from Machiavelli, the deliberately hostile code." For embedded teams, this is a good mental model of what compile-time checks can and cannot do. Types can prevent many classes of everyday mistakes, but they are not a substitute for threat modeling, code review, and defensive design against deliberate misuse.

The book also makes a point about code clarity: "code speaks louder than comments." This line appears when introducing `non_null_ptr<T>` as a way to encode "this cannot be null" in the type instead of a hopeful comment. The point is that the compiler enforces invariants much more reliably than that TODO you left in 2017. It's a great contrast between "documentation-driven development" and "type-driven honesty," with a jab at comments that rot while the type system quietly keeps working.

Later, when the topic turns to undefined behavior, the book becomes deliberately strict: "a correctly written C++ program has no undefined behavior." Many of us treat small pockets of UB as "pragmatic compromises" that we'll clean up later; the author instead argues that UB is a fundamental breakdown in the reasoning model between you and the compiler. In a review context, this is one of the main takeaways: if you want predictable, debuggable embedded systems, treating UB as non-negotiable is not perfectionism, it is risk management.

## Code stories: where C++ gets surprisingly sharp

The book shines when it uses small code snippets to show how local choices ripple into global behavior. Rather than abstract advice, you get concrete, minimal examples that you can almost type into a REPL or unit test and see fail in exactly the way the author predicts. Here is a taste of those examples:

### Empty base optimization: using inheritance as a space-saving tool

The book demonstrates how inheriting from empty classes (or using `[[no_unique_address]]`) can make "invisible" members and shrink object size compared to naive composition. On the surface it looks like a simple size-of experiment, but it forces you to think about the object model, ABI constraints, and how C++ lays out aggregates in memory. 

```cpp
template<typename T> struct default_deleter {
    void operator()(T* p) const { delete p; }
};

// EBO allows stateless deleters to occupy zero bytes in unique_ptr,
// making it the same size as a raw pointer
template<typename T, typename D = default_deleter<T>>
class unique_ptr : private D {
    T* ptr = nullptr;
public:
    unique_ptr(T* p) : ptr(p) {}
    ~unique_ptr() { (*static_cast<D*>(this))(ptr); }
    
    // Size comparison
    static constexpr size_t size_with_ebo = sizeof(unique_ptr);         // 8
    static constexpr size_t size_without_ebo = sizeof(T*) + sizeof(D);  // 9
};

struct X {};

int main() {
    unique_ptr<X> p(new X);
    printf("With EBO %lu\n", unique_ptr<X>::size_with_ebo);
    printf("Without EBO %lu\n", unique_ptr<X>::size_without_ebo);
}
```

### Union type punning: active member rules

This snippet is where C++ politely tells C programmers that their favorite union-punning trick might not work anymore. Writing to `u.f` and reading from `u.n` "kinda works" on your machine until it doesn't.

```cpp
union U {
    float f;
    int n;
};

constexpr int bad_punning() {
    U u{1.5f};        // u.f is active member
    return u.n;       // UB: reading non-active member
}
```

The book contrasts this with safe `memcpy` punning and the oddly specific "common initial sequence" loophole, which is both technically fascinating and just absurd enough to be funny. For embedded developers porting C code or working with memory-mapped hardware, this distinction between "works on my hardware" and "actually correct" is crucial.

### assert() macro side effects danger with NDEBUG

This demonstrates how putting side effects inside `assert()` makes them vanish in release builds, leaving "works in debug, broken in prod" landmines. In debug, your `assert(important_work() == 42);` calls the function and everything looks fine; in release with `NDEBUG`, the assert and the side effect vanish like they were never written. The book presents this not as a gotcha but as an argument for encoding assumptions in types and control flow instead of macros. For teams working on safety-critical or high-reliability embedded software, it's a compelling case to treat debug builds as a diagnostic tool, not as evidence that the program is correct.

### Placement new for MMIO/volatile: construct safely, don’t delete the register block

It’s common in embedded code to wrap a memory-mapped register block in a C++ type and then use placement new to construct it directly over the MMIO base address. The book’s example makes three points very explicit: the storage is not owned by the object (so you never call `delete` on the pointer), non-trivial types still need their destructor run manually, and the underlying registers must stay `volatile` so the compiler does not “optimize away” or reorder I/O.

```cpp
struct HardwareRegisters {
    volatile std::uint32_t r0{}, r1{}, r2{};
    HardwareRegisters() = default;
    ~HardwareRegisters() = default;
};

int main() {
    alignas(HardwareRegisters) static unsigned char buf[sizeof(HardwareRegisters)];

    auto* manual = new (buf) HardwareRegisters{};
    manual->r0 = 0xA5A5A5A5u;
    std::cout << "manual.r0 = 0x" << std::hex << manual->r0 << std::dec << "\n";
    manual->~HardwareRegisters(); // Required for non-trivial types
}
```

### TRY_NEW macro with IIFE: eliminating null checks at the call site

The book shows how an immediately invoked function expression (IIFE) lambda can wrap `new (std::nothrow)` and automatically abort on allocation failure, removing the need for explicit null checks at every call site. The macro version uses variadic arguments to forward constructor parameters, while a template alternative uses perfect forwarding for better type preservation. Both approaches guarantee that you never receive a null pointer from allocation—if memory is exhausted, the program terminates immediately.

```cpp
#include <new>
#include <cstdlib>

#define TRY_NEW(T, ...) [&] { \
    auto* p = new (std::nothrow) T(__VA_ARGS__); \
    if (!p) std::abort(); \
    return p; \
}()

template<typename T, typename... Args>
T* try_new(Args&&... args) {
    if (auto* p = new (std::nothrow) T(std::forward<Args>(args)...)) {
        return p;
    }
    std::abort();
}

struct Widget { int id; Widget(int i) : id(i) {} };

int main() {
    // Macro version
    auto* w1 = TRY_NEW(Widget, 100);

    // Template version
    auto* w2 = try_new<Widget>(200);
    
    delete w1;
    delete w2;
}
```

## Conclusion: power, responsibility, and embedded trade-offs

C++ provides great control over memory, layout, and lifetime that is still hard to match in other mainstream languages. This book does an unusually good job of exposing that power while being honest about the responsibilities that come with it: understanding the object model, designing for exception safety, respecting the type system's limits, and treating undefined behavior as a serious defect, not a curiosity.

As embedded engineers, we need the power—deterministic destruction, well-understood layouts, custom allocators, and zero-overhead abstractions are all central to what we ship. But are we ready for the responsibility? The real question is whether we are ready to adopt the discipline this book advocates: encoding ownership in types, refusing to rely on "works on my hardware" UB, and designing code so that lifetimes and resource flows are obvious at every `}`. If we are, then this book is less a nice-to-have and more a practical roadmap for using C++ responsibly in the systems we care about.

