Coding with local models: Not great… but also not bad👀

I'm a big fan of running local distilled models with Ollama, so when I saw people using them for coding I wanted to try...

First experience? Pretty terrible...
The model didn't understand the task, failed simple steps, retried… and failed again.

But the real problem was the *context window.*
By default, Ollama runs models with only 4096 tokens of context. That's a conservative safeguard to avoid GPU/VRAM OOM errors.

It's fine for chat and API calls, but for coding assistants (Claude Code, OpenCode) it’s too small. These tools often assume 64k+ context so the model can see instructions, tool outputs, previous attempts, and parts of your codebase. With only 4K tokens, Ollama simply truncates the prompt, so the model keeps “forgetting” things.

After increasing the context to a conservative 32K, the results were actually not bad.
Still worse than cloud models, but for simple coding and small fixes it works surprisingly well.

If your local coding assistant feels confused, check this first.
Increase the context: `OLLAMA_CONTEXT_LENGTH=32768`

Sometimes the problem isn’t the model. It’s that your coding assistant is working with 4K tokens of memory
Read more 👉 https://lnkd.in/d4DuxBer
