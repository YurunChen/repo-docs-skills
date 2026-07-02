# Change log

| Timestamp | Request | Actions | Verification | Result |
| --- | --- | --- | --- | --- |
| 2026-07-02 10:02 CST | Align generated guide with the updated repo-docs references scope. | Moved the chat API contract from `references/` to `modules/`; updated README, module, glossary, and case-study index links; kept source evidence and quality review under `references/`. | Updated repo-docs validator passed with 0 errors and 0 warnings. Source evidence remains synced through 2e254ac. | Guide structure matches the current references scope. |
| 2026-06-29 | Build first repo-docs guide for `bolt.diy`. | Added scoped guide for web chat request path: README, walkthrough, chat stream module, provider/model module, chat API contract, evidence ledger, quality review, glossary, and root agent routing. | `validate_repo_docs.py repo-docs --repo-root .` passed with 0 errors and 0 warnings. Synced through 2e254ac. | First guide package created with source-confirmed evidence and explicit exclusions. |
