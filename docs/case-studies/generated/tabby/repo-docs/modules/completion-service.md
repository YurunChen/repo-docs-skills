# Completion Service

## Plain model

The completion service is the boundary between an editor request and model inference. It validates what kind of request arrived, decides how to build the prompt, calls the generation engine, logs what happened, and returns a stable response shape.

## Code model

`CompletionService` stores config, a `CodeGeneration` engine, an event logger, a standard prompt builder, and a next-edit prompt builder. `create_completion_service_and_chat(...)` loads model-backed generation objects and returns the optional completion service, completion stream, and chat stream.

`generate(...)` creates a completion id, derives language, branches to next-edit mode when requested, builds generation options, and then chooses one of three prompt sources:

| Request state | Service behavior |
| --- | --- |
| `debug_options.raw_prompt` exists | Use the raw prompt directly and skip segments. |
| `segments` exists | Build snippets, rewrite prompt from prefix and suffix, then generate. |
| Neither exists | Return `CompletionError::EmptyPrompt`. |

After model output, it logs `Event::Completion`, builds optional `debug_data`, and returns `CompletionResponse`.

## Verify

Inspect `crates/tabby/src/services/completion.rs`. Its test module covers `test_completion_service`, `test_contains_crlf`, `test_override_prompt`, and `test_override_generated`.

Read next: [retrieval snippets](retrieval-snippets.md) for how external code context reaches the prompt.

Evidence status: Confirmed unless noted.
