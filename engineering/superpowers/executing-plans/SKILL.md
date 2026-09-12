---
name: executing-plans
description: Use when a plan directory made by writing-plans must be executed task by task by an efficient local model, with evidence-based verification and a final audit
---

# Executing Plans (Small Models)

Execute a plan directory task by task, proving every step with pasted
output, and finish with an audit table that walks the spec's Acceptance
Criteria.

These rules exist because small models drift toward locally-plausible
shortcuts and report confidence instead of evidence. Follow them literally.

**Announce at start:** "I'm using executing-plans to implement this plan."

## Step 0: Load the Whole Chain First

Before ANY task, read all three, in this order:
1. The spec (path is in index.md) - especially the Acceptance Criteria and
   Constants sections (every constant must end up provable by an audit row)
2. `interfaces.md` - every signature and field you will copy
3. `index.md` - global constraints, Constraint Coverage, execution order

If the spec has no Acceptance Criteria section, STOP and tell the user.
This plan was not made by writing-plans - do not improvise a process.

## Step 1: Per Task

1. Read ONE task file. Do the task. Then move to the next file.
2. Follow its steps exactly, in order.
3. CONTRADICTION GATE: if any code in the task differs from
   `interfaces.md` - different field name, different default, extra or
   missing parameter - STOP. Paste both versions side by side and ask the
   user which is right. NEVER pick one silently. NEVER "fix" it yourself.
   A plan bug is a finding, not a judgment call.
4. EVIDENCE RULE: after every verify command, PASTE the last lines of its
   output into the session. A checked checkbox without pasted output is
   NOT done. Expected-failure (RED) output counts as evidence too.
5. Only after pasting evidence, mark the step and task complete.

## Step 2: Coding Rules While Executing

- Copy code from the task file. Do not improve, rename, or "simplify" it
  on the fly. If the code looks wrong, that is a contradiction-gate STOP.
- Every `except: continue` or `except: pass` you write MUST log the path
  and the error. Silent skips are bugs, not resilience.
- If a test fails twice after honest fixes, STOP and report. Do not
  weaken the test to make it pass.

## Step 3: STOP Immediately When

- A verify command's output differs from expected - retry once, then STOP
- An instruction is missing, ambiguous, or contradicts another document
- You cannot resolve a referenced skill or file by its name - say so, ask
- You would have to guess

Ask, don't guess. A stopped run costs minutes; a wrong guess costs the
whole feature.

## Step 4: Final Audit Table (never skip)

After the last task, before claiming ANY completion, produce this table
in the session - one row per spec Acceptance Criterion line:

```
| # | Criterion (INPUT ⇒ EXPECTED) | Where (file:line) | Command | Pasted output | Verdict |
|---|------------------------------|-------------------|---------|---------------|---------|
| 1 | parse missing topic ⇒ ValueError | domain/knowledge.py:87 | `uv run pytest tests/test_knowledge_domain.py::test_parse_missing_topic_raises -q` | (pasted above) | VERIFIED |
| 2 | ... | ... | ... | (pasted above) | NOT-VERIFIED |
```

Rules for the table:
- One row per criterion. No merging. No skipping.
- Verdict is VERIFIED only if the command's output was pasted in this
  session. Anything else is NOT-VERIFIED.
- Any NOT-VERIFIED row ⇒ do NOT declare the work complete. Report the
  table and STOP for the user.

Then run the full test suite one last time and paste its summary line.

## Step 5: Report

Report to the user: tasks done, audit table, final test summary, and the
branch state. Let the user decide about committing and merging.

## Remember

- Evidence over claims. Paste output, not confidence.
- A contradiction found is a win, not a failure of the run.
- The audit table is the completion condition. No table, no "done".
