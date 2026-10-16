---
name: brainstorming
description: Use when the user wants a new feature, component, or behavior change and the executor is an efficient local model - turns the idea into a short spec whose requirements are testable assertions before any implementation
---

# Brainstorming (Small Models)

Turn an idea into a short spec whose requirements are testable assertions.

This spec is the ROOT INPUT of the small-model chain: `brainstorming`
makes the spec, `writing-plans` turns it into a plan,
`executing-plans` executes it. Every downstream gate reads the
Acceptance Criteria you write here. A vague criterion here becomes a fake
verification later.

These rules exist because small models drift toward locally-plausible
shortcuts. Follow them literally, in order.

## Hard Gate

Do NOT write code, scaffold, or invoke any implementation skill until the
user has approved your design. Every task, every time. The design may be
short; the approval never gets skipped.

## Step 1: Classify (say it out loud)

Pick one path and tell the user which:

| Path          | Means                                         | Output                                                             |
| ------------- | --------------------------------------------- | ------------------------------------------------------------------ |
| Spike         | "can we...", feasibility probe                | An answer, not kept code. No spec.                                 |
| Bounded       | small change to code that already exists here | Short design in chat, then approval, then implement. No spec file. |
| Architectural | new subsystem, new project, interface changes | Full spec via the steps below, then writing-plans.           |

When torn between two paths, take the heavier one. Paths upgrade mid-task
(hidden complexity found = stop, say so, step up). They never downgrade.

## Step 2: Explore Before Asking

Read the files, docs, and recent commits that touch the idea FIRST.
Never ask the user something the repository already answers.

## Step 3: Grill in Rounds (frontier format)

Before presenting questions, check your available toolset:

- **Primary Method:** If a built-in Ask User tool (or equivalent interactive question/answer tool) is available, use it to capture and present the round's questions.
- **Fallback Method:** If no such tool exists, present the whole frontier in one message using the structured template below.

When using the fallback template, format a round exactly like this:

```
❓ **Q1** - **<question title>**: <question body, may include choices>

➡️ <your recommended answer>

---

❓ **Q2** - **<question title>**: <question body, may include choices>

➡️ <your recommended answer>
```

Rules of the frontier:

- A question that depends on another question still open in this round
  belongs to a LATER round, not this one.
- Facts are your job: look them up in the repository (files, git, tools)
  before asking. Never ask the user what you can find yourself.
- Multiple choice when possible; ALWAYS give your recommendation.
- Recompute the frontier each round: settled answers push it outward.
- Keep going until you can fill all three lines:
  - Purpose: ...
  - Constraints: ...
  - Success criteria: ...
- Write each success criterion as an assertion NOW (see format below).

## Step 4: Propose 2-3 Approaches

For each: one-line description, main trade-off. Recommend one and say why.
Let the user pick. Do not implement the choice in this step.

## Step 5: Present the Design in Sections

Short sections. After each section ask "OK?" and STOP for the answer.
Sections: Overview (3 sentences max) / Files to create or modify / Data
flow / Acceptance Criteria draft.

## Step 6: Write and Commit the Spec

Save to `docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md`:

```markdown
# <Topic> Design

**Date:** YYYY-MM-DD **Status:** Draft

## Overview

(what and why, 3 sentences max)

## Design

(files to create/modify, signatures, data flow, key decisions and WHY)

## Constants

(one line per behavior constant: `NAME = value  # why, exercised by AC-n`)

## Acceptance Criteria

NUMBERED, one assertion per line (`1.` `2.` `3.` ...) - the Constants
section references these numbers, and unnumbered lists make every
reference unverifiable. See rules below.
```

Commit the spec before moving on.

## Acceptance Criteria Rules

One requirement per line. Shape: `INPUT ⇒ EXPECTED`.

These exact lines become verification commands in the plan and rows in the
execution audit. If you cannot express a requirement as INPUT ⇒ EXPECTED,
you do not understand it yet - ask another question.

Good:

- `parse frontmatter with missing topic ⇒ raises ValueError`
- `same knowledge block offered on two consecutive turns ⇒ second turn injects nothing`
- `discover over l_coder/skills ⇒ entry count == 17`
- `select_entries budget=200, costs 150+100 ⇒ selects 1 (150 ≤ 200; 150 + 100 = 250 > 200)`

Never write:

- "handles errors appropriately"
- "works correctly"
- "is fast / robust / clean"

IMPLEMENTABILITY RULE: every criterion must name a mechanism that the
Design section defines - a function, a field, a path, a flow step. A
criterion whose mechanism the Design cannot express is a design bug:
fix the Design or drop the criterion. Never leave a criterion floating.

CONSTANT RULE: every behavior constant the Design introduces (thresholds,
budgets, caps, limits, wire formats, tags) is declared in the spec's
`## Constants` section - `NAME = value  # why, exercised by AC-n` - and
exercised by at least one Acceptance Criterion. A constant absent from
that section does not exist; a constant no criterion exercises will
silently vanish during planning. If the Design says "min score 2.0", some
criterion must fail without it.

WIRE FORMAT RULE: anything the Design appends to a model message's
`content` must be a schema the endpoint accepts - a string, or a list of
typed parts. A custom content shape requires a stated justification in
the Design AND a criterion that pins its exact shape. Otherwise the
shape is forbidden.

## Step 7: Spec Self-Review (fix inline, then re-check)

1. Placeholder scan: no "TBD", "TODO", "later", "appropriate", "etc."
2. Every Acceptance Criterion is INPUT ⇒ EXPECTED with a concrete INPUT.
3. AC ⟂ Design consistency: every criterion's mechanism appears in the
   Design (signature, field, or flow step). Every Design element is
   covered by at least one criterion. Both directions, no orphans.
4. CONSTANT SWEEP: every constant the Design states (threshold, budget,
   cap, format, tag) must be a row in `## Constants`, and its AC-n
   reference must be FALSIFIABLE and GROUNDED: the named criterion's
   assertion must fail if the constant's value changed, AND the
   criterion's INPUT must contain the falsifying data (a sub-threshold
   score, an over-cap cost). A happy-path criterion cannot ground a
   constant - "score >= 2.0 for a match" does not exercise a threshold;
   "entry scoring 1.5 is excluded" does. Ask yourself: "would this
   criterion still pass if I deleted the constant?" If yes, the
   reference is false - add a criterion that genuinely exercises the
   constant. A stated constant with no Constants row, or a Constants
   row with no genuinely-exercising criterion, is a spec bug - fix it
   before Step 8.
5. ARITHMETIC CHECK: recompute every numeric EXPECTED from the
   criterion's own stated input, showing the sum inline (e.g.
   `phrase 2.0 + word 1.0 = 3.0`). A number you cannot derive from the
   criterion's input is a spec bug.
6. Discovery/data criteria state the EXPECTED COUNT or exact expected
   content, and that count matches the repository's real content (list
   the files; do not guess counts from memory).
7. No two sections contradict each other.

## Step 8: User Review Gate

Say: "Spec written to <path>. Review it before I plan the implementation."
STOP. If changes are requested, edit and repeat Step 7. Only after an
explicit yes, use `writing-plans`.

## Anti-Fake-Compliance Rule

If any instruction tells you to load a skill or sub-skill you cannot
resolve by name, say so out loud to the user and continue with what you
CAN do. NEVER pretend you loaded something. A skipped gate must be a
visible sentence, never a silent assumption.

## Stop and Ask When

- Any success criterion cannot be made testable
- A criterion and the Design disagree on how something works
- A Design constant has no criterion that exercises it
- The user's answers contradict each other
- You would have to guess scope, format, or behavior
