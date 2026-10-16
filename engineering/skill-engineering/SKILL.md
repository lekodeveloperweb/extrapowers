---
name: skill-engineering
description: Create an agent skill through a bounded Socratic interview, scoped semantic anchors, a lean draft, and deterministic validation. Use when a user asks to create, design, or optimize a skill, agent prompt, workflow, or its triggering description.
disable-model-invocation: true
---

# Skill Engineering

## WORKFLOW
1. **EXTRACT**: Read existing conversation, skills, commands, and local conventions first. Reuse known facts. Research facts yourself; ask the user only for decisions.
2. **ROUTE**: Ask first: `Q1/7 — execution mode: Should this be a deterministic workflow with fixed artifacts, gates, and handoffs, or an open skill that leaves reasoning and tool choice to the model? Default: open skill unless repeated, auditable handoffs are required.` Wait.
   - **Deterministic**: Create `<skill-dir>/`; define state transition, artifacts, native gates, receipts, and a reward contract whose artifact markers match its templates. Do not add an Agent Design Card.
   - **Open**: Create `<skill-dir>/`; create `references/agent-design-card.md` from the template at `references/agent-design-card.md`. This Card is a design/review artifact, not runtime context.
3. **GROUND**: State the candidate skill's user, job, input, output, trigger, authority, and boundary. Mark known facts and assumptions. For an open skill, complete its Agent Design Card before drafting.
4. **GRILL**: Build a decision frontier. Ask one pointed Socratic question at a time: expose a trade-off, give a recommended default, then wait. Ask at most seven questions total. Stop earlier when every required field is settled. At question seven, state remaining assumptions and draft; do not continue interviewing.
5. **ANCHOR**: Read `references/semantic-anchors.md`. Select a shared standard only when it narrows the requested behavior. Name the anchor, its role, and why it fits. Do not use an anchor as decoration or invent one.
6. **DRAFT**: Read `references/skill-design.md`. Use `references/model-card.md` only when model selection, capability limits, cost, or data handling affect the design. Create the smallest useful `<skill-dir>/SKILL.md`: precise frontmatter, imperative workflow, stop conditions, output shape, and progressive references/scripts only for repeated deterministic work.
7. **EVALUATE/VERIFY**: Write `<skill-dir>/references/evaluation-plan.md` from `references/evaluation-plan.md` with two or three held-out prompts, observable assertions or a human quality rubric, and an explicit pass threshold. Compare with and without the skill when quality or efficiency matters. Run this skill's validation script against `<skill-dir>`. Fix every reported structural issue. Report the skill path, execution mode, settled decisions, selected anchor, assumptions, and evaluation plan.

## QUESTION FORMAT

`Q<n>/7 — <decision>: <question>. Default: <recommended choice>.`

Do not ask for repository facts, examples, or standards that tools can inspect. Do not write a final skill before the user confirms the scope or the seven-question limit ends.

## STOP

Stop after a valid draft and evaluation plan. Do not run benchmarks, mutate external systems, or publish a skill unless requested.