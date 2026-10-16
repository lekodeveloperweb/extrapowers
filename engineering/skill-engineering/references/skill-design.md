# Skill Design Reference

## Design rules

1. Extract intent from existing conversation and repository evidence before asking.
2. Description carries discovery: say what the skill does and concrete contexts that should trigger it.
3. Keep `SKILL.md` procedural and under 150 lines. Put large or conditional material in `references/`; put repeatable deterministic work in `scripts/`.
4. Explain why a constraint matters. Avoid rigid wording when a clear rationale gives the model room to reason.
5. Test with realistic prompts. Use assertions only where outputs are objectively checkable; use human review for creative or judgment-heavy work.

## Interview fields

| Field | Decision |
|---|---|
| Job | One user outcome the skill enables |
| Trigger | User language and contexts that should invoke it |
| Input | Required information and repository context |
| Output | Artifact, response shape, or completed action |
| Boundary | Work explicitly excluded |
| Authority | Read-only, local write, or approval-required action |
| Evaluation | Held-out prompts, success evidence, failures, pass threshold, and a budget or stop condition only where work can expand |
| Execution mode | Deterministic `workflow-invoked` or open `user-invoked` |
| Agent Design Card | Required design artifact for open skills; omit for deterministic workflow skills |
| Model Card | Required only when model choice, limits, cost, or data handling affect the design |
