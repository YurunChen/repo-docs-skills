# Session Assembly

## Plain Model

Before Aider can ask a model to edit code, it needs to decide what kind of session the user is running. Startup collects that decision from several places: command-line arguments, config files, environment variables, git state, model settings, file arguments, lint/test preferences, and optional modes such as watch or copy/paste.

The key idea is that startup produces an operating policy for the edit loop. The `Coder` should not rediscover whether auto-commit is enabled, which files are in scope, or what test command to run; those choices are made at the CLI boundary and passed in.

## Code Model

The package exposes the terminal command through `pyproject.toml`, and `aider/__main__.py` calls the same `main()` function for module execution. `main()` then:

1. discovers a git root when git support is available;
2. builds the `.aider.conf.yml` search order from current directory, git root, and home directory;
3. parses arguments once to discover config/env choices;
4. loads dotenv files;
5. parses arguments again;
6. creates `InputOutput`, `Commands`, `ChatSummary`, model/repo state, and map/lint/test/commit options;
7. calls `Coder.create()` with that policy.

The main source anchor is [`main()` from git/config discovery through parsing](https://github.com/Aider-AI/aider/blob/5dc9490bb35f9729ef2c95d00a19ccd30c26339c/aider/main.py#L451), followed by [`Coder.create()` receiving the session policy](https://github.com/Aider-AI/aider/blob/5dc9490bb35f9729ef2c95d00a19ccd30c26339c/aider/main.py#L972).

Minimal entrypoint shape:

```toml
[project.scripts]
aider = "aider.main:main"
```

`Coder.create()` turns the requested or model-default edit format into a concrete class. If the edit format changes while switching coders, it can summarize prior chat history so the old edit-format examples do not confuse the new coder. The source anchor is [`Coder.create()` resolving edit format and cloning context](https://github.com/Aider-AI/aider/blob/5dc9490bb35f9729ef2c95d00a19ccd30c26339c/aider/coders/base_coder.py#L124).

## Read Next

After startup has built the session policy, [the edit lifecycle explains how model output is parsed, checked, written, and reflected](edit-lifecycle.md).

Evidence status: Confirmed unless noted.
