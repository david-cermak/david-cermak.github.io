Bill Weinman's C++ STL Cookbook, second edition, is a collection of standard-library recipes for intermediate and experienced C++ programmers. The main coverage is C++23, followed by a chapter on
C++26 and proposed future features.

I read it from an **embedded-development perspective**, but its value is not specific to embedded. My main reason to recommend it is practical: it identifies standard facilities that can replace application-specific implementations, then demonstrates their use in relatively small examples.

This is not an introductory C++ text. The preface assumes familiarity with classes, templates, and the STL. I would treat it as supplementary reading for someone who already writes C++ and wants to use more of the library effectively.

![Cover of STL Cookbook](/images/stl-cookbook.png)

## Organization and scope

The book starts with C++23 additions and selected coding practices, then covers containers, iterators, lambdas, and algorithms. Later chapters address strings and formatting, utility types, concurrency, filesystem operations, and larger worked examples. Despite the title, its scope extends beyond the STL in the narrower containers-and-algorithms sense.

The recipe format suits **selective reading**. I would start with the table of contents, identify unfamiliar facilities, and compile the relevant examples. Reading sequentially is possible, but I found the book more useful as a collection of techniques than as a continuous argument.

Compiler and library support also matter. The preface discusses implementation gaps and identifies cases where examples could not be tested. These notes should be read as a record of the author's development environment, not as a permanent statement about feature availability.

## What the author has to say

The author's commentary gives the recipes some personality: "I view C++ as five languages cobbled together" is a reasonably economical explanation of why the language needs a cookbook in the first place.
And it also justifies the structure of the book, each layer: C, macros, objects, templates, STL, has its own idioms, and the confusion often comes from mixing them. Seeing the STL as the fifth language, built on the other four, makes it rather interesting and less like *magic*.

On containers, the author writes that "the heart of the STL is in its container classes." Algorithms, iterators, views, and utilities all exist to serve sequences of elements. You simply have to understand what a container guarantees about storage, ordering, and invalidation.

Particulary interesting line on concurrency: "a mutex does not lock data; it blocks execution." Clear and obvious, but helps to reason about threading mental model.

And on the purpose of the new abstractions: "the purpose of `span` is to encapsulate raw data of a contiguous array to provide a measure of safety and utility, with a minimum of overhead." That is the book's design philosophy in one sentence. The modern STL keeps giving you ways to say what you mean (a view, a borrow, a size that travels with a pointer) without paying for what you don't need.

## The most useful material

For me, the container and algorithm recipes are the strongest part of the book. They connect a library operation to a concrete requirement: whether element order matters, when construction should occur, or whether an intermediate container is necessary.

### Removing an element without preserving order

The naive way to remove an element from the middle of a `vector` shifts everything after it, which is O(n). The book's `quick_delete()` observes that if order doesn't matter, you can move the back element into the hole and `pop_back()`: O(1):

```cpp
template<typename T>
void quick_delete(T& v, size_t idx) {
    if (idx < v.size()) {
        if (idx != v.size() - 1) v[idx] = std::move(v.back());
        v.pop_back();
    }
}
```

### `emplace` versus `try_emplace`

This one is a beautiful demonstration of a hidden cost:

```cpp
std::map<std::string, BigThing> m;
m.emplace("Hendrix", "Singer");      // constructs "Singer" even if the key exists!
m.try_emplace("Hendrix", "Singer");  // constructs the payload only if inserted
```

Nothing about the call site looks expensive, the difference only shows up with large payloads or many collisions.

### Compose with ranges, materialize last

The modern STL in miniature:

```cpp
auto v = views::iota(1, 11)
       | views::transform([](auto n){ return n * 5; })
       | ranges::to<std::vector<int>>();
```

Lazy views, a lambda transform, and one explicit container at the end. Readable, efficient, and type-safe. It is the clearest argument I've seen that the ranges library is a readability feature as much as a performance one.

### Braces versus parentheses

Initialization in C++ is about *which constructor runs*, braced initialization is the general case; parentheses can be a trap.

```cpp
std::vector<int> a {5, 5};   // initializer_list: {5, 5}
std::vector<int> b (5, 5);   // count, value:     {5, 5, 5, 5, 5}
```

### Share flags with std::atomic

Chapter 9 stresses that `atomic` uses hardware atomic instructions where available, that `is_lock_free()` reports whether it does, that the wrapped type must be trivial, and that 64-bit atomics can be far slower than 32-bit ones on some platforms. `atomic_flag` and the `atomic_*_lock_free` aliases are the guaranteed lock-free choices.

```cpp
#include <atomic>

std::atomic<bool> ready {};
std::atomic<uint64_t> g_count {};
std::atomic_flag winner {};

void countem (int id) {
    while (!ready) std::this_thread::yield();
    for (int i {}; i < max_count; ++i) ++g_count;
    if (!winner.test_and_set()) {
        std::println("thread {:02} won!", id);
    }
}
```

# Manage optional values with std::optional

Similarly, an std::optional<T> return value explicitly represents either a value or its absence. I generally prefer that interface to an undocumented sentinel when absence is an expected result.

For example, a function which returns the first factor if there is one:
```cpp
#include <optional>

using olong = std::optional<long>;

olong factor(const olong& n) {
    if (!n) return {};
    for (long i = 2; i <= *n / 2; ++i) {
        if (*n % i == 0) return {i};
    }
    return {};
}
```

For firmware use, I would evaluate each recipe against the project's constraints: allocation policy, exception behavior, execution-time requirements, code size, and toolchain support. The book provides examples to investigate; I would not treat it as a validation of those examples for a particular target.

## Limitations

My main reservation is the level of analysis I want before applying a recipe in production. A compact example can explain an operation without resolving all the questions relevant to a particular application. I would use a separate reference for exact preconditions, invalidation rules, complexity guarantees, and exception behavior.

The mapped-lambda dispatch example illustrates this distinction. The book presents a dispatch mechanism built around a map and callable objects. I would evaluate it against a switch or a fixed dispatch table before adopting it, particularly where the command set is known at compile time.

I would also separate illustrative examples from performance evidence. Before relying on a timing comparison, I would want the compiler version, optimization settings, standard-library implementation, input sizes, and allocation behavior, followed by measurements on the intended target.

The final chapter requires an additional qualification. It discusses reflection, contracts, and structural pattern matching, but these do not have the same standardization status. Pattern matching missed C++26 and is now a priority for C++29. Compiler-support statements also age quickly: GCC 16.1 already included experimental reflection and contracts support when it was released in April/2026. 
I would therefore read that chapter as an overview of language development.

## Assessment

C++ STL Cookbook, second edition, is useful supplementary reading for an intermediate C++ programmer. Its main benefit is exposure to library facilities and implementation alternatives that may not appear in everyday work.

The embedded relevance is real, but selective. I found the interface and storage examples more useful than any general argument for adopting the standard library wholesale. The appropriate approach is to identify a relevant recipe, establish its requirements, and test it in the intended environment.

My recommendation is to use the book one recipe at a time, alongside a library reference and a compiler. Its value is not in eliminating handwritten loops, but in providing more implementation choices—and enough context to begin evaluating them.

## Links

GitHub repository with examples: https://github.com/PacktPublishing/CPP-STL-Cookbook-Second-Edition
