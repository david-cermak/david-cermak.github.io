Nikolai Kutiavin's **No More Helloworlds: Build a Real C++ App** follows the development of a small, but real-life application, from initial design through implementation, testing, and CI. It is aimed at developers who know C++ but have not yet built and maintained a complete project. The example, *match-search*, is a graphical grep-like tool that searches a directory for a regular expression. The book uses it to introduce architecture, CMake, interfaces, GTest/GMock, Git, Docker, and Qt.

I read it mainly as something I would hand to a junior/intern to show how the pieces of a real C++ workflow fit together. 
As an *embedded developer*, Qt Widgets are outside my of usual work, but much of the design advice applies directly: keep presentation separate from application logic, put that logic in libraries, and reflect module boundaries in the build and tests.

This is not an introductory C++ text. It assumes familiarity with classes and the standard library. Its subject is what comes next: organizing a repository, managing dependencies, testing components, and making changes without breaking existing behavior.


![Cover of No More Helloworlds](/images/helloworlds.png)

## Organization and scope

The chapters develop a single repository in sequence:

* Chapter 1: introduces the approach and toolchain: CMake, GCC 14, Qt 6, GTest/GMock, and Ubuntu 24.04 or a development container.
* Chapter 2: defines the architecture.
* Chapter 3: expresses that architecture as CMake targets.
* Chapter 4: implements the domain logic behind interfaces.
* Chapters 5 and 8: cover unit, UI, and integration testing.
* Chapter 6: introduces Git, GitHub, and CI.
* Chapter 7: implements the Qt GUI.
* Chapter 9: assembles the application in main().
* Chapter 10: discusses moving on to an independent project.

The book is best read in order. Later chapters depend on the interfaces and module boundaries established earlier. The project remains small: a files-search domain library, a gui library, and a one-file executable. That makes it possible to follow the design decisions without spending much time learning the application itself.

The tooling is specific: Linux commands, Ninja, Qt Widgets, and GitHub Actions. This helps when following the examples, although Windows and macOS readers will need to adapt some of the setup.

## What the author has to say

The author the main theme directly: "Knowing the language is necessary, but professional development also requires an understanding of architecture, build systems, testing, and version control." And later: "Understanding this full workflow is one of the key differences between writing small programs and building software professionally." That is the book in two sentences. And on architecture: "In short, architecture is how you keep complexity under control as the project grows."

On testing: "Good tests enable confident change." On UI testing: "UI tests should verify behavior, not appearance." On change management: "The key lesson is that software development is not only the process of writing new code, but also the process of integrating change without breaking what already exists."

## The most useful material

For me, the strongest material is where a design rule becomes a build rule or a testable seam. The architecture and CMake chapters do that more clearly than most C++ books I have seen aimed at this audience.

### Layers and hexagonal architecture

Chapter 2 is the section I would most want a junior developer to read carefully. It compares closed layered architecture with hexagonal, or ports-and-adapters, architecture. The former restricts dependencies between adjacent layers; the latter separates the application core from external systems through interfaces. Sequence, component, and class diagrams are introduced where they help explain interactions or structure.

The implementation guidance is straightforward: keep the executable small, use libraries with narrow interfaces, and choose a consistent approach to error handling. Operations can return results synchronously or report progress through callbacks, but callbacks alone do not make blocking work asynchronous.

The distinction between public and private APIs receives useful attention. Public headers define what other modules may depend on. Concrete classes and helpers remain implementation details. The directory layout reflects that separation through include/ and impl/, and the next chapter carries it into CMake.

For embedded development, this is more relevant than the choice of GUI framework. Domain logic that does not depend directly on a display, communications interface, or hardware driver is easier to test independently. Ports and adapters provide a useful way to organize those dependencies.

### The target is the architecture

At first glance Chapter 3 looks like a CMake intro. In practice it is an architecture chapter that happens to use CMake as the medium. Targets, `PUBLIC` / `PRIVATE` include paths, and link dependencies are how the layered design becomes enforceable. A public include path, a private implementation path, and a target that consumers link against:

```cmake
add_library(files-search STATIC
    impl/SearcherImpl.h
    impl/SearcherImpl.cpp
)
target_include_directories(files-search PUBLIC
    "${CMAKE_CURRENT_SOURCE_DIR}/include")
target_include_directories(files-search PRIVATE
    "${CMAKE_CURRENT_SOURCE_DIR}")
```

The layer boundary is no longer a diagram. It is a link dependency. Propagation (`PRIVATE` / `PUBLIC` / `INTERFACE`) is explained as the common source of large-scale CMake pain, which matches what I have seen on real projects. If you only skim the book for "how do I write a `CMakeLists.txt`," you miss the point: the build system is where the architecture either holds or quietly collapses.

### Failure as part of the type

The domain prefers `std::expected` over silent sentinels or ad hoc error codes:

```cpp
enum class Errors { FileNotFound, NotRegularFile, CannotOpenFile };

std::expected<std::string, Errors>
readFile(const std::filesystem::path& file) {
    if (!std::filesystem::exists(file))
        return std::unexpected{Errors::FileNotFound};
    if (!std::filesystem::is_regular_file(file))
        return std::unexpected{Errors::NotRegularFile};

    std::ifstream stream(file);
    if (!stream.is_open())
        return std::unexpected{Errors::CannotOpenFile};

    return std::string(std::istreambuf_iterator<char>(stream),
                       std::istreambuf_iterator<char>());
}
```

Callers have to handle the failure modes the type admits. That is a better teaching device than another paragraph about "checking return values."

## Limitations

The book follows one application on one primary stack. Readers using Windows-native tools, another GUI framework, or a headless service will need to adapt the examples. It is a worked project, not a cross-platform reference.

The project’s size is both useful and limiting. Its structure is small enough to understand in full, but it does not expose the packaging, dependency-management, migration, and performance problems found in much larger codebases. Readers joining those projects will still need additional material and team-specific guidance.

The toolchain versions also date the setup instructions: GCC 14 and Ubuntu 24.04 are the versions used by the examples. The discussion of interfaces, target dependencies, testing, and CI **is not version-dependent**.

The Git chapter should be treated as an introduction to the project’s workflow, not a replacement for a Git reference. It covers branches, pull requests, rebasing, and avoiding changes to shared history. More involved history editing warrants additional study before applying it to a team repository.

## Assessment

*No More Helloworlds* is useful for a programmer who can write C++ programs, but has not yet taken a project from an empty repository to a tested, reviewable change. Its main strength is consistency: the directory layout, CMake targets, interfaces, tests, and CI configuration all follow the same module structure.

Its relevance to embedded development is selective but substantial. The Qt implementation is not directly applicable to firmware, while the dependency structure, testable libraries, and small composition root are. Those ideas apply whether the external interface is a desktop GUI, a command-line tool, or a hardware driver.

I would recommend it for mentoring juniors and for self-study after learning the language basics. It is best used with the companion repository open and the examples built and tested along the way. After that, an independent project is likely to be more useful than further extensions to match-search.

The book does not replace a detailed C++ or CMake reference. It explains how to use those tools together on a manageable project, which is often the part missing from introductory material.

## Links

GitHub repository for the running example: https://github.com/sqglobe/match-search
