---
name: requirements-persona
description: >-
  Creates, imports, and maintains persona profiles as data.
  Use this skill when the team needs user personas for a feature: the AI generates grounded persona
  proposals (based on roles and optional web research), OR imports existing personas written
  externally, from a file. A human confirms and refines the result. This skill saves confirmed
  personas as structured markdown files under personas/. This skill works across projects (the domain model is optional).
  Working language: English, ASD-STE100.
---

# Step 1 — Create a Persona (AI Proposes, a Human Confirms)

> **AUTHORITATIVE GUIDANCE — MANDATORY COMPLIANCE**
>
> This is the mandatory process to produce user personas as reusable data. The domain model, the
> functional scope, and the persona template are **embedded** under `references/`. Nothing links
> to the rest of the workspace. `personas/...` is the output write target.

---

**Purpose**: Produce solid user personas as **reusable data**, **or** import existing personas.
Personas are the basis for hypothetical user stories (step 2). Context (optional, when a project
domain model exists): roles and modules from
[references/functional-scope.md](references/functional-scope.md), terms from
[references/domain-model.md](references/domain-model.md). Without a domain model, this skill
works domain-agnostic (the role is free text).

## Triggers

Activate this skill when:
- the team needs user personas for a feature
- the team needs grounded persona proposals, for a human to confirm or refine
- the team needs to import existing, externally written personas from a file
- a confirmed persona must become the basis for user stories or prototype work

## Rules

1. Personas are **hypothetical (simulated)**, until step 5 (real people) validates them. Keep the
   field `validation: simulated` until then, even for imported personas.
2. Do not invent real personal data. Do not use sensitive personal data.
3. A persona must connect to a real role. Do not use generic, fictional users. **When** a project
   domain model or DDD context exists, connect the persona to its roles and contexts. Otherwise,
   accept the role as free text (for cross-project use).
4. Save the persona only **after confirmation**. Check terms against
   [references/domain-model.md](references/domain-model.md), **when a domain model exists for the
   project**. When importing, carry over all fields without loss.
5. **Language and ASD-STE100:** Use English in every agent message and every artifact. Write
   all output in ASD-STE100 (Simplified Technical English). Use short sentences. Use one thought
   per sentence. Use active voice. Use present tense for facts. Use concrete words, not abstract
   words. Do not use metaphors or idioms.

## Workflow

There are two entry points: **import** (use existing personas) or **generation** (propose new
ones). Ask at the start which path applies. Default: import, when the user already opened or
named a persona file.

### Import Path

**P-0 Import Personas**: Read the source (the file the user opened or named, for example
`personas_*.md`). Identify each persona in the file. Map each one, **without loss**, to
[references/persona_template.md](references/persona_template.md), including the optional fields
(`decision_authority`, `usage_context`, `kpi_ownership`, `age`, `experience`). Set the frontmatter:
`source: imported`, `status: confirmed`, `validation: simulated`. Write one file per persona, at
`personas/{persona-slug}.md`. Show a short confirmation list (which personas, under which slug).

### Generation Path

**P-1 Clarify the Frame** (one question per turn): Which feature or problem is this for? Which
DDD context, if any? Which role(s), roughly, is the focus?

**P-2 Generate Persona Proposals**: Present **2–3 persona drafts**. Optionally, use web research
(the **exa** or **Firecrawl** plugin) for realistic context. Name the sources. For each draft,
fill the profile schema briefly (see
[references/persona_template.md](references/persona_template.md)).

**P-3 Confirm and Refine**: The human picks or changes a draft. Save the result as a file only
**after confirmation**: `personas/{persona-slug}.md`, following the template. Set the field
`status: draft`, then change it to `status: confirmed` after confirmation.

## Output
Confirmed personas under `personas/` (one file per persona). Optionally, export the profile as a PPTX through the built-in
**slide-creator**.

## References
- [references/functional-scope.md](references/functional-scope.md) — Roles and modules as a persona anchor
- [references/domain-model.md](references/domain-model.md) — The ubiquitous language
- [references/persona_template.md](references/persona_template.md) — The profile schema
