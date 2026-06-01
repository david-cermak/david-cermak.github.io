Just a build script… why would you debug it? (My exact words ~10 years ago)

Today’s modern embedded ecosystems often wrap CMake with extra tools like 𝐰𝐞𝐬𝐭 or 𝐢𝐝𝐟.𝐩𝐲. These tools run and re-run the CMake generation step, expand config options, and manage dependencies...
Writing a project/component CMakeLists.txt can get surprisingly complex.

Fortunately CMake has solid debugging and tracing capabilities.
I created a small demo repo to show how to use them in practice, including
VS Code debugger setup:
👉 https://github.com/david-cermak/cmake-debug

More useful links in the comments: Standalone CMake debugger, SKILL.md for CMake tracing, VS Code settings.
