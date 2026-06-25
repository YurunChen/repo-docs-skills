# Repo-Docs Quality Rules

## Evidence Standard

Use one status family across the package (README, walkthroughs, modules, references, glossary, change-log, Seed memory):

- **Confirmed / 已确认:** current repo evidence (code, tests, config, data, command output, artifacts) directly shows it.
- **Inferred / 推断:** reasonable inference from inspected evidence, not directly asserted or tested.
- **Planned / 计划中:** accepted or decided future work or design that is not implemented yet.
- **Unknown / 未确认:** plausible, disputed, or awaiting verification.

Confidence and source are orthogonal. When support comes from outside the repo (external papers, docs, design notes), keep the confidence label and add an inline source note such as `Inferred (prior work: ...)`. This replaces a separate "prior work" status, which conflated source with confidence.

Use source links when possible. Include exact line links when available; otherwise link to the file path and say what to search for. Put the page-level default at the end of the page (`Evidence status: Confirmed unless noted.` / `证据状态：除特别标注外，本页基于当前源码已确认。`); use local labels when confidence changes or when a specific statement needs extra support.

Code and data statements require extra discipline:

- Treat current source, tests, config, data, command output, and artifacts as the truth for implemented behavior.
- Treat README files, older docs, memory, papers, and user descriptions as context until runtime evidence confirms them.
- Do not present an uninspected file, field, command, artifact, metric, tool parameter, or test as proof.
- Do not invent sample rows, task ids, function names, output files, metric denominators, or schema fields. Use real evidence or label the item as a neutral example.
- Do not upgrade `Planned` or `Inferred` content to `Confirmed` because it sounds plausible.
- If code and data disagree with old docs or memory, trust current code/data and put a caveat beside the affected topic.
- If verification is cheap, run or inspect it before writing the statement. If verification is not run, say what command or check would confirm it.
- Keep evidence labels quiet when one status dominates a page; label locally only when mixing statuses or when a statement needs extra support. A page can contain confirmed current behavior, inferred explanation, planned next work, and unknown caveats, but the reader must be able to tell which is which without reading an evidence table.
- Use skill examples as style references only. Do not copy fictional paths, fields, commands, task ids, or outputs into real docs.

## Quality Bar

The docs are good when a newcomer can answer these in about 15 minutes using the guide alone:

1. What is the repo trying to accomplish?
2. What is the shortest path to understand one real run?
3. How do I reproduce or run the main experiment/workflow?
4. Which concepts remain fuzzy after the walkthrough, and which ones deserve separate module pages?
5. What data contracts or schemas does the walkthrough depend on—and where are exact field names?
6. After reading a concept page, what command or test would confirm I understood the mechanism?
7. For research repos: what is the research question, method, metric, data contract, and baseline/ablation story?
8. What caveats matter for the topic I am reading right now?
9. For any important rule, contract, transformation, or lifecycle step, what is one concrete example that works and one edge case that fails?
10. Can a newcomer trace one real workflow from observable entry to output/artifact without opening source code first?
