![Cover](/images/programmers-mindset.png)

Book Review: *The C++ Programmer's Mindset* by Sam Morley  
Perspective: embedded / microcontroller developer  

## Introduction and mathematical framing

As an embedded developer, the opening pages of *The C++ Programmer's Mindset* present an initial barrier. The text introduces differential equations, mathematical induction, formal proofs, clustering algorithms, and distributed systems running on Linux server clusters. The author acknowledges this orientation: "The author is a mathematician by training. The process there is exactly the same, although they are known for taking the abstraction step a little further than is perhaps warranted."

At first examination, the material appears targeted at data scientists working on x86-64 workstations and GPU clusters, not developers constrained by kilobytes of RAM, idiosyncratic peripherals, and hard real-time deadlines. However, the underlying computational principles transfer directly to embedded systems development.

The book's primary contribution is its systematic approach to computational thinking rather than C++ syntax. Morley structures the initial chapters around four pillars:

* **Decomposition**
* **Abstraction**
* **Pattern recognition**
* **Algorithm design**

These are presented through problems that appear distant from bare-metal programming, yet the methodology applies directly to firmware development. Decomposing firmware features into composable sub-problems, selecting appropriate abstractions for hardware interfaces, recognizing patterns in control flow, and designing algorithms deliberately rather than through habit all improve code quality and maintainability in embedded contexts.

## Building modern C++ fundamentals

The middle chapters connect computational thinking to concrete C++ mechanisms: templates, concepts, standard library algorithms, and data structures. The central thesis is that effective abstractions should not merely hide complexity but guide developers toward efficient implementations. As Morley states: "The real gains come from ensuring one works with the hardware to improve the efficiency (but not complexity) of the algorithm."

The chapter on data structures provides particularly relevant guidance for embedded developers. The text emphasizes that container selection must account for memory layout, iterator stability, cache behavior, and asymptotic complexity. The chapter's design principle is explicit: "start with `std::vector` and RAII-managed heap ownership; move to lists, deques, stable/flat/hash structures, or custom allocators only when you have a clear reason rooted in mutation patterns, lifetime, or measured performance." This aligns with the author's mantra: "just use a vector."

Linear containers (`std::array`, `std::vector`, static vectors) offer contiguous memory layouts that provide predictable traversal costs and superior cache locality. The trade-off is expensive mid-container insertion and erasure, along with iterator invalidation during reallocation. For embedded systems, this translates to preferring ring buffers implemented as fixed-size arrays or `std::array` over linked lists when traversal performance matters. The text notes: "This means that using a vector might have a profound impact on the runtime performance of your code, even if it doesn't change the underlying computational complexity of the algorithm (and sometimes even if it does)."

Data layout within linear memory receives significant attention. Array-of-structs layouts degrade cache behavior when only a subset of fields is frequently accessed; switching to struct-of-arrays (or full entity-component-system component arrays) recovers locality for component-wise updates. This principle applies directly to embedded systems where sensor data structures, telemetry packets, or state machines benefit from layout optimization.

## Algorithms and data layout

The book demonstrates these principles through concrete examples. Chapter 4 presents matrix multiplication implementations that illustrate the performance impact of cache-aware algorithms. A naive implementation iterates through matrices in a straightforward triple-nested loop:

```cpp
void dgemm_basic(MatrixView<const double> A, MatrixView<const double> B, 
                 MatrixView<double> C, double alpha, double beta) {
    for (ptrdiff_t i = 0; i < A.rows(); ++i) {
        for (ptrdiff_t j = 0; j < A.cols(); ++j) {
            double tmp = 0;
            for (ptrdiff_t k = 0; k < B.cols(); ++k) {
                tmp += A[i][k] * B[k][j];
            }
            C[i][j] = beta * C[i][j] + alpha * tmp;
        }
    }
}
```

The blocked (tiled) variant processes matrices in cache-sized blocks, accumulating partial results in a tile buffer that remains resident in cache:

```cpp
void dgemm_blocked(MatrixView<const double> A, MatrixView<const double> B,
                   MatrixView<double> C, double alpha, double beta,
                   ptrdiff_t block_size) {
    Matrix<double> tile(block_size, block_size);
    
    for (ptrdiff_t i_block = 0; i_block < C.rows(); i_block += block_size) {
        for (ptrdiff_t j_block = 0; j_block < C.cols(); j_block += block_size) {
            std::fill_n(tile.data(), tile.size(), 0.0);
            
            for (ptrdiff_t k_block = 0; k_block < B.cols(); k_block += block_size) {
                // Accumulate partial products in tile
                for (ptrdiff_t i = 0; i < i_bound; ++i) {
                    for (ptrdiff_t j = 0; j < j_bound; ++j) {
                        for (ptrdiff_t k = 0; k < k_bound; ++k) {
                            tile[i][j] += A[i_block + i][k_block + k] * 
                                         B[k_block + k][j_block + j];
                        }
                    }
                }
            }
            // Write back accumulated tile to C
        }
    }
}
```

The blocked implementation demonstrates how restructuring data access patterns to align with cache line boundaries can yield substantial performance improvements without changing algorithmic complexity. For embedded developers, this translates to organizing sensor readings, communication buffers, and state tables to maximize spatial locality.

Smart pointers (`unique_ptr`, `shared_ptr`, `weak_ptr`) receive thorough treatment. The text emphasizes that "in idiomatic C++, every new should be paired with a corresponding delete, which is hidden by the use of smart pointers." For embedded systems, `unique_ptr` with custom deleters provides deterministic resource management for peripherals, DMA buffers, and hardware-allocated memory regions. The discussion of allocators, particularly `std::pmr` polymorphic allocators, offers patterns for controlling memory allocation behavior:

```cpp
static std::array<std::byte, 1024> buffer{};
static std::pmr::monotonic_buffer_resource pool{buffer.data(), buffer.size()};

void use_pool() {
    std::pmr::vector<int> values{&pool};
    values.reserve(16);
    values.push_back(1);
    values.push_back(2);
    // All allocations for 'values' come from 'buffer' via 'pool'.
}
```

This pattern enables deterministic allocation behavior suitable for real-time systems where heap fragmentation and non-deterministic allocation times are unacceptable.

The book's treatment of associative containers (maps and sets) distinguishes between ordered (tree-based) and hash-based variants, with flat (vector-backed) alternatives presented as high-performance options. Tree-based `std::map` and `std::set` provide ordered iteration and O(log N) operations but suffer from pointer-heavy layouts that degrade cache performance. Hash-based `std::unordered_map` and `std::unordered_set` offer average O(1) lookup but require careful hash function design and load factor management. The text notes that benchmarks confirm hash maps outperform ordered maps by roughly an order of magnitude for random lookups, with flat and node-based variants converging when working sets fit in cache.

## Case study: clustering tool and modular design

The second half of the book presents a case study: building a command-line clustering tool that reads multiple file formats, processes text, implements k-means clustering, and scales across machines and accelerators. Morley emphasizes designing interfaces (for file readers, clustering components, configuration) that are composable and testable. The book demonstrates modular design using CMake, with components separated into libraries that expose stable public interfaces while allowing internal implementation changes.

## Testing and correctness

Testing receives systematic treatment through Google Test (gtest/gmock). The text shows how to structure unit tests, use test fixtures, and employ mocking to isolate components. For embedded developers, this translates to testing hardware abstraction layers, communication protocols, and control algorithms in isolation before integration testing on target hardware.

## Performance, profiling, and hardware awareness

Performance measurement is addressed through Google Benchmark, which provides reproducible microbenchmarking infrastructure. The book explains how to structure benchmarks using `State`, `Arg`/`Args`/`Range`, `DoNotOptimize`, and `ClobberMemory` to prevent compiler optimizations from invalidating measurements. The text cautions that "microbenchmarking allows you to focus on very small fragments of the bigger picture, but sometimes this can make you miss details elsewhere," advocating for multiple layers of measurement from microbenchmarks to full-system profiling.

The final chapters on profiling, scaling, and specialized hardware crystallize the book's central message: **measure twice, cut once**. Morley demonstrates repeatedly that performance intuition is unreliable; only careful measurement and profiling identify actual bottlenecks. The author states: "one should never optimize until the performance is measured and the algorithm is known to underperform; measure twice, cut once." On microcontrollers, the tools differ—logic analyzers, cycle counters, and custom tracing instead of `perf`—but the methodology is identical: hypothesize, instrument, measure, and modify code in small, controlled steps, verifying that changes actually improve performance.

Morley extends this measurement-driven approach to heterogeneous hardware by comparing single-threaded AVX2, multithreaded CPU, and CUDA implementations of a simple axpy-style kernel. The figure below shows a mildly counterintuitive result: for small vector sizes, a single well-vectorized CPU core outperforms both the multithreaded and GPU variants, because kernel-launch overhead and memory-bandwidth limits swamp any benefit from additional cores or SMs until the problem size grows.

![performance-over-samples](/images/exec-time-chart.png)

The text emphasizes that "most code is limited in speed by the rate at which data can be moved around." This observation directs attention to data movement patterns, memory bandwidth, and cache behavior rather than pure computational complexity. For embedded systems, this means analyzing bus utilization, DMA transfer patterns, and memory access sequences rather than focusing solely on instruction counts.

## Conclusion and personal takeaways

Is this a practical handbook for daily embedded work? Not directly. Many specific technologies: GPU libraries, MPI and cloud deployments will not appear in firmware projects. However, it succeeds as a bridge between mathematical problem-solving methodology and practical C++ engineering, particularly regarding containers, algorithms, and performance measurement.

For my own work, three aspects of the book aligned closely with problems I am currently solving:

- **Ranges rather than raw iterators**: In C++20 and C++23, `std::ranges`, views, and contiguous views provide an alternative to raw iterator pairs; when available, they make it easier to express algorithms over abstract ranges and to state preconditions and ownership boundaries explicitly, while still interoperating with existing iterator-based code.
- **Google Benchmark as a first-class tool**: The chapters on profiling and microbenchmarking make a strong case for treating Google Benchmark as part of your codebase, and illustrate its use in the accompanying [GitHub repository](https://github.com/PacktPublishing/The-CPP-Programmers-Mindset).
- **Template-based serialization**: The discussion of Boost.Serialization and related template-heavy approaches to binary formats provided useful patterns for evolving message contracts in a type-safe way, which is directly relevant when small embedded devices have to interoperate reliably with more dynamic, cloud-side services.

These are idiosyncratic highlights, but they illustrate how the book’s general design and performance themes can be translated into concrete, day-to-day C++ practices.

For embedded developers willing to translate desktop and cluster-oriented examples to microcontroller contexts, *The C++ Programmer's Mindset* offers three principal takeaways: **adopt computational thinking as a systematic methodology**, **learn from mainstream C++ practices before adapting them to embedded constraints**, and **let empirical measurements, not intuition, drive performance optimization**. With these principles in mind, the book earns its place on an embedded engineer's reading list.

## Links

[github repo](https://github.com/PacktPublishing/The-CPP-Programmers-Mindset)
[optimisation hints](https://www.agner.org/optimize/)