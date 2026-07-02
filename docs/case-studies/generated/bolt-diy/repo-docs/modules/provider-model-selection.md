# Provider and model selection

## Why provider choice starts in message text

Provider selection is text-driven at the chat boundary and registry-driven at the model boundary. The browser writes the selected provider and model into the user message. The server extracts those tags, removes them from model-visible content, and asks the provider registry for a model instance that the AI SDK can call.

This matters because bolt.diy supports many providers with different model discovery rules. A provider may have static models, dynamic models fetched from an API, cached dynamic models, custom settings, and environment-bound credentials. The chat route should not know each provider's API shape; it delegates that to provider classes registered by `LLMManager`.

## How the selected provider becomes a callable model

`extractPropertiesFromMessage()` reads `[Model: ...]` and `[Provider: ...]` from user message content and returns cleaned content. Source: [tag extraction](https://github.com/stackblitz-labs/bolt.diy/blob/2e254ac19a696394030601bc602f54945b12bfc4/app/lib/.server/llm/utils.ts#L8).

`streamText()` then looks up the provider in `PROVIDER_LIST`, checks static models, and asks `LLMManager.getModelListFromProvider()` for dynamic models when static lookup misses. If no provider model list exists, it throws. If the selected model is missing, it normally falls back to the first available model after logging a warning. Source: [model resolution in `streamText()`](https://github.com/stackblitz-labs/bolt.diy/blob/2e254ac19a696394030601bc602f54945b12bfc4/app/lib/.server/llm/stream-text.ts#L107).

`LLMManager` registers provider classes exported by the registry, stores them by provider name, and combines static and dynamic models. Dynamic model fetch failures are caught and treated as empty dynamic lists during broad updates, which means the app can still show static models when a provider API cannot be reached. Source: [provider registration and model updates](https://github.com/stackblitz-labs/bolt.diy/blob/2e254ac19a696394030601bc602f54945b12bfc4/app/lib/modules/llm/manager.ts#L33).

Token parameters are selected after the model is known. Reasoning model names matching `o1`, `o3`, or `gpt-5` use `maxCompletionTokens` and get unsupported sampling options removed. Other models use `maxTokens`. Source: [token parameter selection](https://github.com/stackblitz-labs/bolt.diy/blob/2e254ac19a696394030601bc602f54945b12bfc4/app/lib/.server/llm/stream-text.ts#L224).

Minimal message prefix:

```text
[Model: gpt-4o]

[Provider: OpenAI]

Build a dashboard for my app.
```

## Where to read next

To place this concept in the full request path, read [how a user prompt becomes a streamed answer](../walkthroughs/one-real-run.md). For the exact request fields carrying provider state, use [the chat API contract](../modules/chat-api-contract.md).

Evidence status: Confirmed unless noted.
