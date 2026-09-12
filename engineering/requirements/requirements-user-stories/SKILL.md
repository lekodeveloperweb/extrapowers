---
name: requirements-user-stories
description: >-
  User-stories workflow of the Requirements Engineer — turns one concrete need into complete, testable work items
  (epic → feature → user story). Use this skill when the user wants to create user stories, epics,
  features, vertical slices, or acceptance criteria, or wants to clarify a need and turn it into a
  ticket system entry or `.md` files. Runs an interview (one question per turn), checks terms
  against the domain model, cuts vertical slices, optionally builds a lo-fi prototype, and creates
  work items. Working language: English, ASD-STE100.
---

# User Stories — Epic → Feature → User Stories

> **AUTHORITATIVE GUIDANCE — MANDATORY COMPLIANCE**
>
> This is the mandatory process to turn a need into complete, testable work items. The domain
> model and template files are **embedded** under `references/`. Nothing links to the rest of the
> workspace. Paths under `docs/plans/...` are output write targets, not references.

---

**Purpose**: Turn one concrete need into complete, testable work items.
Load `re-context` (domain model, templates, ticket system configuration). For a prototype, use
`enbw-web-prototype`. For a review at the end, use `re-requirements-review`.

## Triggers

Activate this skill (mode 2) when the user:
- wants to create user stories, epics, features, or vertical slices
- wants to write acceptance criteria
- wants to clarify one concrete need and turn it into a ticket system entry or `.md` files

## Rules

1. Ask exactly **one** question per turn in the interview. Wait for the answer. Never bundle
   questions.
2. Check terms against [references/domain-model.md](references/domain-model.md) before you write
   ACs, **when a domain model exists for the project**. Otherwise, keep terms consistent within the
   project.
3. Write ACs as given-when-then, with stable IDs (`AC-01`, and so on), linked back to slice IDs.
4. **Keep traceability always**: need → `SLICE-NN` → epic ID → feature ID → story ID.
5. Create items in the ticket system **only when a ticket system project context exists**. Confirm
   the org and project from [references/ado-config.md](references/ado-config.md) first. Never
   create an item without confirmation. Without a ticket system context, save the work as local
   `.md` files.
6. **Optional quality extensions:** When the need involves real-time, reactive, event-driven,
   state-driven, or unwanted-behaviour requirements (e.g. alarms, threshold monitoring, device
   reactions), probe whether EARS patterns should be used. When the need touches authentication,
   authorization, personal data, payments, external APIs, or device control, probe for relevant
   OWASP ASVS controls and levels. Wait for team confirmation before adding these sections to
   work items.
7. **Language and ASD-STE100:** Use English in every agent message and every artifact. Write
   all output in ASD-STE100 (Simplified Technical English). Use short sentences. Use one thought
   per sentence. Use active voice. Use present tense for facts. Use concrete words, not abstract
   words. Do not use metaphors or idioms.

## Workflow

```
── User Stories ──────────────────────────────────────
1   Clarify       → Scope, actors, goal (interview, 1 question per turn)
2   Language      → Check terms against the domain model
3   Slices        → Vertical slices and readiness
3.5 Prototype     → Optional, for unclear requirements
3.6 Quality Ext.  → Optional EARS / OWASP ASVS (only if relevant)
4   Work Items    → Epic → Feature → User Stories (.md or ticket system)
5   Review        → Joint check, open points
──────────────────────────────────────────────────────
```

### Step 1 — Clarify (Interview, One Question Per Turn)
```
**[Header]**
Question: …
Recommended: … (default)
Reason: …
```
1. Ask exactly **one** question per turn. Wait for the answer. Never bundle questions.
2. Ask blocking questions first (scope, actors). Ask dependent questions after (constraints,
   success criteria).
3. Stop as soon as scope, actors, constraints, and success criteria are testable.

### Step 2 — Check the Domain Language [If a Domain Model Exists]
1. Check terms against [references/domain-model.md](references/domain-model.md): entities, enums,
   business rules. Without a project domain model, skip this check. Keep terms consistent within
   the project instead.
2. Mark aliases explicitly (for example, "project lead" = `ProjectManager`).
3. Fix the terms so the ACs become clearly testable.

### Step 3 — Vertical Slices
1. Cut the need into thin, vertically deliverable slices (`SLICE-01`, and so on).
2. For each slice: a stable ID, a description, mapped ACs (`AC-01`, and so on), and dependencies.
3. Readiness: `ready` / `needs_work` / `not_ready` (is it testable? Are dependencies known? Is a
   design available?).
4. Save the result to `docs/plans/issues_YYYYMMDD_{slug}.md`, using
   [references/templates/issues_template.md](references/templates/issues_template.md).

### Step 3.5 — Prototype [Optional]
Use this step when requirements are unclear, or when a visible walkthrough helps.
Use the skill **`enbw-web-prototype`**: build from the embedded template, use the bundled design
library, use only `enbw-*` classes. Walk through scenarios. Update ACs and slices when you find a
gap.
Save the result to `docs/plans/prototype_YYYYMMDD_{slug}.html`.

### Step 3.6 — Quality Extensions [Optional]
After the slices are stable, review whether the need triggers optional quality extensions:

- **EARS (Easy Approach to Requirements Syntax)** — Ask when the slices contain real-time,
  reactive, event-driven, state-driven, or unwanted-behaviour requirements (e.g. alarms,
  threshold monitoring, device reactions).
  If the team confirms relevance, map each applicable slice to an EARS pattern:
  - Ubiquitous: `The <System> shall <System Response>`
  - Event-driven: `When <Event>, the <System> shall <System Response>`
  - Unwanted behaviour: `If <Unwanted Condition>, then the <System> shall <System Response>`
  - State-driven: `While <State>, the <System> shall <System Response>`
  - Optional feature: `Where <Feature>, the <System> shall <System Response>`
  Store confirmed EARS statements under `## EARS Requirements` in the user story.

- **OWASP ASVS** — Ask when the slices touch authentication, authorization, personal data,
  financial data, external APIs, or device control.
  If the team confirms relevance, suggest the appropriate ASVS level
  (1 — opportunistic, 2 — standard, 3 — advanced) and list the most relevant control
  categories (e.g. V1 Architecture, V2 Authentication, V3 Session Management, V4 Access Control,
  V5 Validation, V6 Cryptography, V8 Data Protection).
  Document confirmed controls under `## Security Considerations (OWASP ASVS)` in the user story.

Skip this step entirely if neither extension appears relevant.

### Step 4 — Create Work Items
**4a Output path**: Save locally as `.md`, **or** use the ticket system backlog through the ticket
system MCP server. Confirm the org and project from
[references/ado-config.md](references/ado-config.md) first. Never create an item without
confirmation. Fallback: `.md` or `.xlsx`.

**4b Epic** (follow
[references/templates/epic_template.md](references/templates/epic_template.md)):
Create one epic per topic or DDD context. Fields: title, area path, iteration, priority, value
area, DDD context. Sections: business value, goals, scope in/out, metrics, dependencies,
stakeholders, timeline. Save to `docs/plans/workitems/epic_YYYYMMDD_{slug}.md`.

**4c Feature(s)** (follow
[references/templates/feature_template.md](references/templates/feature_template.md)):
Create 1 to N features per epic, derived from the slices. Fields: title, parent epic ID, priority.
Sections: description, high-level story, ACs (checklist), design reference, technical notes. Save
to `docs/plans/workitems/feature_YYYYMMDD_{slug}.md`.

**4d User Stories** (follow
[references/templates/userstory_template.md](references/templates/userstory_template.md)):
Create one story per slice (1:1). Fields: title, parent feature ID, priority, story points
(Fibonacci: 1/2/3/5/8/13). Content: "As a [role], I want [goal], so that [benefit]." Write ACs as
given-when-then with stable IDs (`AC-01`, and so on), linked back to slice IDs. Add a test
strategy (unit/integration/E2E), a design reference (classes from the project design system), and
a definition of done.
If Step 3.6 was confirmed, add the `## EARS Requirements` and/or
`## Security Considerations (OWASP ASVS)` sections to the story. Save to
`docs/plans/workitems/userstory_YYYYMMDD_{slug}_{nr}.md` (or bundled in
`docs/plans/userstories_YYYYMMDD_{slug}.md`).

**Keep traceability always**: need → `SLICE-NN` → epic ID → feature ID → story ID.

### Step 5 — Review
Write a short summary: the problem, the epic/feature structure, the slices with mapped ACs,
readiness, changed terms, and open points. Wait for feedback. Go back to a specific step when
needed.
For a deep multi-persona review, use `re-requirements-review`.

## References
- [references/domain-model.md](references/domain-model.md) — Entities, enums, business rules
- [references/ado-config.md](references/ado-config.md) — Org and project for ticket system setup
- [references/templates/epic_template.md](references/templates/epic_template.md)
- [references/templates/feature_template.md](references/templates/feature_template.md)
- [references/templates/userstory_template.md](references/templates/userstory_template.md)
- [references/templates/issues_template.md](references/templates/issues_template.md)
