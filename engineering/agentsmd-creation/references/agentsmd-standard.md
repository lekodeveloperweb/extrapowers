# AGENTS.md Standard

## Principles

- Inspect repository structure and root README first; read `/docs` only when it is relevant to the target instruction.
- Do not repeat README, architecture, general coding style, or information an
  agent can locate cheaply.
- `AGENTS.md` is an open, predictable repository-level instruction file; no
  mandatory schema.
- Prefer a few verified build/test commands and non-discoverable local rules.
- More context can increase cost and reduce task success. Add an instruction
  only when it changes a useful agent action.
- Treat unexpected agent behavior as a code, tooling, or task-definition
  problem before adding another prompt rule.

## Minimal shape

```markdown
# Build and test

- `verified build command`
- `verified test command`

# Local conventions

- One non-obvious project convention with its source.

# Safety

- One approval or boundary rule.
```

Keep headings only when they contain verified, actionable content.
