---
name: requirements-ideation
description: >-
  Mode 1 of the Requirements Engineer — ideation. Use this skill when the user wants to explore new
  feature ideas, map out a problem or opportunity space, or score options, without committing yet.
  This skill runs a structured interview (one question per turn), generates 2–3 scored feature
  options, and hands off to re-user-stories once the user decides. It produces no artifact. Any
  insight can flow forward as an option. Working language: English, ASD-STE100.
---

# Mode 1 — Ideation: Explore New Features

> **AUTHORITATIVE GUIDANCE — MANDATORY COMPLIANCE**
>
> This is the mandatory process to map out an idea space and score options. **This mode produces
> no artifact.** Any insight can flow forward as an option. Always check terms against
> `re-context` (the domain model).

---

**Purpose**: Map out an idea space, score options, commit to nothing.
**No artifact**: Insights can flow forward, optionally, into mode 2 (`re-user-stories`).
Check terms against `re-context` (the domain model, the DDD contexts).

## Triggers

Activate this skill (mode 1) when the user:
- wants to explore new feature ideas
- wants to map out a problem or opportunity space
- wants to score options, without committing yet

## Rules

1. Ask exactly **one** question per turn. Never bundle questions.
2. This mode creates no work items. It only explores and scores options.
3. **Language and ASD-STE100:** Use English in every agent message. Write all text in ASD-STE100 (Simplified Technical English). Use short sentences. Use one thought per sentence. Use active voice. Use present tense for facts. Use concrete words, not abstract words. Do not use metaphors or idioms.

## Workflow

### I-1 — Understand the Problem Space (One Question Per Turn)
```
**[Header]**
Question: …
Recommended: … (default)
Reason: …
```
Guiding questions:
- Which problem or opportunity does this address?
- For which role?
- Which bounded context does this affect (Home Energy Visibility / Costs and Self-Consumption / Energy Opportunities / …)?
- What happens if the team does nothing?

### I-2 — Generate Feature Options
Present **2–3 options**. For each option:
```
Option [number]: [Feature name]
DDD context:   [Context]
Benefit:       [What gets better, and for whom?]
In scope:      [What this includes]
Out of scope:  [What this explicitly excludes]
Risks:         [What could go wrong?]
Estimate:      [Small / Medium / Large]
```

### I-3 — Decide
- The user picks one option: hand off to `re-user-stories` (start the interview at step 1).
- The user wants to explore more: run another round of I-2.
- The user wants only a record: write a chat summary. Do not write a `.md` file.
