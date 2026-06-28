# Glossary

| Term | Plain meaning | Further reading |
| --- | --- | --- |
| `CompletionRequest` | The JSON shape sent by an editor for code completion. | [completion request](walkthroughs/completion-request.md) |
| `Segments` | Prefix, suffix, filepath, repository, snippets, and edit history around the cursor. | [completion service](modules/completion-service.md) |
| `PromptBuilder` | The component that turns segments and snippets into the model prompt. | [retrieval snippets](modules/retrieval-snippets.md) |
| `AllowedCodeRepository` | The server-side allowlist used before code search can retrieve repository context. | [retrieval snippets](modules/retrieval-snippets.md) |
| `CodeSearch` | The trait used to retrieve relevant repository snippets for completion prompts. | [source evidence](references/source-evidence.md) |

Evidence status: Confirmed unless noted.
