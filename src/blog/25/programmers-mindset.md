![Cover](/images/programmers-mindset.png)

Book Review: *The C++ Programmer’s Mindset* by Sam Morley  

As an embedded developer, the opening pages of *The C++ Programmer’s Mindset* are a little intimidating.  
You are greeted with talk of differential equations, mathematical induction and proofs.
At first sight, it feels like a book aimed squarely at data scientists on x86-64 workstations and GPU clusters, not at someone wrestling with kilobytes of RAM and real‑time constraints.  
But if you read past the initial sections, there is a lot here that directly improves how you reason about code on microcontrollers.  

The real value of the book is that it teaches you to think computationally, not just “write more C++.”  
Morley structures the first part of the book around the four pillars of computational thinking:
* decomposition,
* abstraction,
* pattern recognition
* algorithm design

These concepts are introduced with problems that look far removed from bare‑metal work, yet the mindset applies perfectly to embedded systems.  
Breaking a firmware feature into composable sub‑problems, choosing the right abstractions for hardware access, spotting familiar patterns in control flows, and deliberately designing algorithms instead of “coding by habit” all translate directly into better, more maintainable firmware.  

The middle chapters connect this thinking to concrete C++ tools: templates, concepts, the standard library algorithms, and data structures.  
Here, the main message is that good abstractions should not just hide complexity; they should also guide you toward efficient solutions.  
For an embedded engineer, this is the part that quietly changes how you write code.  
The book’s discussion of containers and memory layouts is framed for general‑purpose systems, but the lessons—prefer contiguous storage when you care about traversal performance, understand the trade‑offs in insertion and lookup, be explicit about ownership—map directly to choices you make in firmware: ring buffers vs. linked lists, static vs. dynamic allocation, and so on.  
Morley also touches on allocators in a way that is surprisingly relevant for embedded work: the examples with custom aligned allocators and `std::pmr` pool resources make it clear how to take control of where and how your containers allocate memory.  
A small `std::pmr::monotonic_buffer_resource` backed by static storage, for instance, gives you a simple pattern for making `std::pmr::vector` or other polymorphic-allocator containers use a fixed arena instead of the global heap—exactly the sort of deterministic behavior you want on a microcontroller, for example:

```cpp
static std::array<std::byte, 1024> buffer{};
static std::pmr::monotonic_buffer_resource pool{buffer.data(), buffer.size()};

void use_pool()
{
    std::pmr::vector<int> values{&pool};
    values.reserve(16);
    values.push_back(1);
    values.push_back(2);
    // All allocations for 'values' come from 'buffer' via 'pool'.
}
```

Where the book could easily have lost an embedded reader is in its focus on x86-64 machines, GPU offload, MPI, and cloud deployments.  
Instead, this actually becomes one of its strengths if you read it as a set of analogies.  
The story about getting more performance by aligning memory access with cache behavior on a CPU, or about batching work to make GPU offload worthwhile, has a clear embedded translation: arrange your data to minimize bus transactions, keep your hot paths small and predictable, and be intentional about every expensive operation (EEPROM writes, peripheral reconfiguration, dynamic allocation).  
The domain is different, but the principles—data locality, minimizing latency, and feeding the hardware the way it wants to be fed—are the same.  

The second half of the book is framed around a larger case study: building a command‑line clustering tool that reads different file formats, processes text, runs a k‑means algorithm, and scales across machines and accelerators.  
This sounds far from typical Embedded work, yet the structure of the project is very familiar:  
parse inputs, normalize data, implement core algorithms, and then iterate on performance guided by measurement.  
Morley emphasizes designing interfaces (for file readers, clustering components, configuration) that are composable and testable.  
If you replace “file readers” with “drivers” and “clustering engine” with “control loop” or “communication stack,” you get a pretty good guide to structuring a non‑trivial firmware project.  

The final chapters, dealing with profiling, scaling, and specialized hardware such as GPUs, are where the main message crystallizes for an embedded audience: **measure twice, cut once**.
Morley repeatedly shows that intuition about performance is unreliable; only careful measurement and profiling tell you where the real bottlenecks are.  
On a microcontroller, your tools may be different—logic analyzers, cycle counters, and custom tracing instead of `perf`—but the discipline is identical.  
You hypothesize, instrument, measure, and then change code in small, controlled steps, always checking that you actually improved things.  

Is this an everyday handbook for embedded work? Probably not.  
Many of the specific technologies—GPU libraries, MPI, large‑scale cloud deployments—will not show up in your next firmware sprint.  
But as a bridge between mathematical problem‑solving and practical C++ guidelines, especially around containers, algorithms, and performance, it is extremely valuable.  
It nudges you to see your firmware not just as “code that talks to hardware,” but as a carefully designed computation running on a constrained machine.  

For embedded developers willing to look past the desktop‑ and cluster‑oriented examples, *The C++ Programmer’s Mindset* offers three big takeaways:  
* **adopt computational thinking**,
**learn from mainstream C++ practices before adapting them to your constraints**, 
**let real measurements, not guesses, drive your performance work**.
If you keep those lessons in mind, the book more than earns its place on a C++ embedded engineer’s reading list—and you will find yourself reaching for the familiar: measure twice, cut once.  
