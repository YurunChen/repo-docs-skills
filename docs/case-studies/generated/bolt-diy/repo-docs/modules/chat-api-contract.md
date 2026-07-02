# Chat API contract

This module keeps request, cookie, stream annotation, and verification details for the scoped chat path. The narrative flow lives in [the prompt-to-stream walkthrough](../walkthroughs/one-real-run.md).

## Client request body

The browser configures `useChat` with `api: '/api/chat'` and this body shape:

| Field | Meaning | Source |
| --- | --- | --- |
| `apiKeys` | Provider API keys from client state. | [`Chat.client.tsx`](https://github.com/stackblitz-labs/bolt.diy/blob/2e254ac19a696394030601bc602f54945b12bfc4/app/components/chat/Chat.client.tsx#L136) |
| `files` | Current workbench file map, used for context selection and locked-file prompts. | [`Chat.client.tsx`](https://github.com/stackblitz-labs/bolt.diy/blob/2e254ac19a696394030601bc602f54945b12bfc4/app/components/chat/Chat.client.tsx#L138) |
| `promptId` | Prompt-library selection. | [`Chat.client.tsx`](https://github.com/stackblitz-labs/bolt.diy/blob/2e254ac19a696394030601bc602f54945b12bfc4/app/components/chat/Chat.client.tsx#L139) |
| `contextOptimization` | Enables summary and selected-file context path when files exist. | [`Chat.client.tsx`](https://github.com/stackblitz-labs/bolt.diy/blob/2e254ac19a696394030601bc602f54945b12bfc4/app/components/chat/Chat.client.tsx#L140) |
| `chatMode` | Chooses build prompt versus discuss prompt. | [`Chat.client.tsx`](https://github.com/stackblitz-labs/bolt.diy/blob/2e254ac19a696394030601bc602f54945b12bfc4/app/components/chat/Chat.client.tsx#L141) |
| `designScheme` | Optional design prompt input. | [`Chat.client.tsx`](https://github.com/stackblitz-labs/bolt.diy/blob/2e254ac19a696394030601bc602f54945b12bfc4/app/components/chat/Chat.client.tsx#L142) |
| `supabase` | Optional Supabase connection and credentials. | [`Chat.client.tsx`](https://github.com/stackblitz-labs/bolt.diy/blob/2e254ac19a696394030601bc602f54945b12bfc4/app/components/chat/Chat.client.tsx#L143) |
| `maxLLMSteps` | Max tool-call steps passed to the AI SDK options. | [`Chat.client.tsx`](https://github.com/stackblitz-labs/bolt.diy/blob/2e254ac19a696394030601bc602f54945b12bfc4/app/components/chat/Chat.client.tsx#L151) |

The server expects the same fields in `request.json()`. Source: [`api.chat.ts`](https://github.com/stackblitz-labs/bolt.diy/blob/2e254ac19a696394030601bc602f54945b12bfc4/app/routes/api.chat.ts#L51).

## Provider and model tags

User messages carry selected runtime tags in the text:

```text
[Model: <model-name>]

[Provider: <provider-name>]

<user message>
```

The client writes this format for new chats, template-seeded chats, modified-file chats, and normal appended chats. Source: [`Chat.client.tsx`](https://github.com/stackblitz-labs/bolt.diy/blob/2e254ac19a696394030601bc602f54945b12bfc4/app/components/chat/Chat.client.tsx#L435) and [`Chat.client.tsx`](https://github.com/stackblitz-labs/bolt.diy/blob/2e254ac19a696394030601bc602f54945b12bfc4/app/components/chat/Chat.client.tsx#L515).

The server extracts and removes those tags before sending messages to the model. Source: [`utils.ts`](https://github.com/stackblitz-labs/bolt.diy/blob/2e254ac19a696394030601bc602f54945b12bfc4/app/lib/.server/llm/utils.ts#L8).

## Cookies

The chat route reads:

| Cookie | Meaning | Source |
| --- | --- | --- |
| `apiKeys` | JSON object for provider API keys. | [`api.chat.ts`](https://github.com/stackblitz-labs/bolt.diy/blob/2e254ac19a696394030601bc602f54945b12bfc4/app/routes/api.chat.ts#L70) |
| `providers` | JSON object of provider settings. | [`api.chat.ts`](https://github.com/stackblitz-labs/bolt.diy/blob/2e254ac19a696394030601bc602f54945b12bfc4/app/routes/api.chat.ts#L72) |

The separate model-list route uses shared cookie helpers for the same concepts. Source: [`cookies.ts`](https://github.com/stackblitz-labs/bolt.diy/blob/2e254ac19a696394030601bc602f54945b12bfc4/app/lib/api/cookies.ts#L13).

## Stream annotations and progress

| Stream item | When it appears | Source |
| --- | --- | --- |
| `progress` with `summary` | Before and after chat summary generation. | [`api.chat.ts`](https://github.com/stackblitz-labs/bolt.diy/blob/2e254ac19a696394030601bc602f54945b12bfc4/app/routes/api.chat.ts#L108) |
| `chatSummary` annotation | After summary generation. | [`api.chat.ts`](https://github.com/stackblitz-labs/bolt.diy/blob/2e254ac19a696394030601bc602f54945b12bfc4/app/routes/api.chat.ts#L145) |
| `progress` with `context` | Before and after context selection. | [`api.chat.ts`](https://github.com/stackblitz-labs/bolt.diy/blob/2e254ac19a696394030601bc602f54945b12bfc4/app/routes/api.chat.ts#L153) |
| `codeContext` annotation | After selected files are known. | [`api.chat.ts`](https://github.com/stackblitz-labs/bolt.diy/blob/2e254ac19a696394030601bc602f54945b12bfc4/app/routes/api.chat.ts#L186) |
| `progress` with `response` | Before response generation and after normal completion. | [`api.chat.ts`](https://github.com/stackblitz-labs/bolt.diy/blob/2e254ac19a696394030601bc602f54945b12bfc4/app/routes/api.chat.ts#L230) |
| `usage` annotation | On normal completion, with cumulative tokens from prework and final response. | [`api.chat.ts`](https://github.com/stackblitz-labs/bolt.diy/blob/2e254ac19a696394030601bc602f54945b12bfc4/app/routes/api.chat.ts#L231) |

## Verification commands

```bash
pnpm run typecheck
pnpm run test
python path/to/repo-docs-skill/scripts/validate_repo_docs.py repo-docs --repo-root .
```

Current caveat: the repo has Vitest coverage for nearby utilities such as Markdown rendering and message parsing, but no source-discovered test directly covers `/api/chat`.

Evidence status: Confirmed unless noted.
