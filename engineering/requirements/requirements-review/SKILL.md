---
name: requirements-review
description: >-
  Mode 4 of the Requirements Engineer — a multi-persona requirements review, following the PRISMA
  convergence principle (ADR-008). Use this skill when an existing requirement artifact (user
  story, feature, epic, slice, lo-fi prototype) needs a check, a score, or an improvement. Three
  base personas (Pragmatist, Perfectionist, Newcomer), plus optional character types, review the
  artifact independently. Where 2 or more personas agree, the severity escalates (NOTE → REVIEW →
  BLOCK). This skill produces a review report, then applies the BLOCK and REVIEW findings to the
  artifact. Working language: English, ASD-STE100.
---

# Mode 4 — Requirements Review (PRISMA Multi-Persona)

> **AUTHORITATIVE GUIDANCE — MANDATORY COMPLIANCE**
>
> This is the mandatory process for the multi-persona review, following the PRISMA convergence
> principle (ADR-008). The persona definitions, the convergence rules, and the report structure
> are **embedded** under `references/`. Nothing links to the rest of the workspace.
> `docs/plans/...` are output write targets.

---

You review requirement artifacts from several independent perspectives, at the same time. When 2
or more personas find the same problem independently, this is a more reliable signal than one
single opinion. Persona style level: **neutral and professional**. Load the context from
`re-context`.

The full persona definitions, convergence rules, quality criteria, and report structure are in
[references/personas.md](references/personas.md). Read this file at the start of the review.

## Triggers

Activate this skill (mode 4) when an existing requirement artifact needs a check, a score, or an
improvement:
- a user story, a feature, an epic, a slice, or a lo-fi prototype
- result: a review report, and applied BLOCK and REVIEW findings on the artifact

## Rules

1. Never "implement" production code or architecture (a remediation guardrail).
2. Every finding must point to one concrete section or AC. Drop any finding with a confidence
   below 0.55.
3. Use a maximum of 10 findings per persona, per round.
4. **Language and ASD-STE100:** Use English in every agent message and every artifact. Write
   all output in ASD-STE100 (Simplified Technical English). Use short sentences. Use one thought
   per sentence. Use active voice. Use present tense for facts. Use concrete words, not abstract
   words. Do not use metaphors or idioms.

## Workflow

### Process
```
── Mode 4: Requirements Review ────────────────────────
4.1 Review     → Personas check the artifact; convergence and a report
4.2 Implement  → Apply the recommended improvements (BLOCK and REVIEW)
─────────────────────────────────────
```

### Step 4.1 — Review
1. Ask for the path of the file to review (or accept pasted content).
2. Show the configuration dialog (persona choice: **manual** or **automatic**, optional
   character types, minimum rounds, default 2). See references/personas.md.
3. **Round 1**: Each persona reviews the artifact independently (a findings table plus a
   summary).
4. **Convergence rounds**: Personas read each other's findings. Matching findings escalate the
   severity. Stop when: 2 or more rounds ran, AND no new findings appeared.
5. **Synthesis and report**: Write the result to
   `docs/plans/reviews/review_YYYYMMDD_{slug}.md` (structure in references/personas.md). Report
   back the file path.

### Step 4.2 — Apply the Improvements
Take the table **"Recommended actions (prioritized)"**, and **filter for `BLOCK` and `REVIEW`**
(`NOTE` items stay informational). Behavior depends on the session control mode:

**Navigator vertical / horizontal — discuss each proposal one at a time:**
```
**[Label] [number] — [Criterion]**
Finding:    … (source: [persona(s)])
Proposal:   … (a concrete change to the artifact)
Target file: …
```
For each proposal, wait for **accept / adjust / reject**. Then edit the artifact directly.

**Auto vertical / horizontal — the agent decides:**
1. Apply all `BLOCK` findings autonomously.
2. List the `REVIEW` findings briefly. Ask for a one-click confirmation ("all / a selection /
   none").

**For both paths:**
- Apply changes **only to the requirement artifact** (epic/feature/US `.md`, slices, lo-fi HTML).
- Findings that need production code or architecture changes: **do not apply them**. Note them
  as an open point.
- After this, write a **change log** (finding → change → file), plus the open points.
- Optionally, offer a re-review of the changed artifacts (this is not an automatic loop).

## References
- [references/personas.md](references/personas.md) — Persona definitions, convergence rules, report structure
