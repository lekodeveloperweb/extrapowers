---
name: writing-plans
description: Use when an approved spec needs to become an implementation plan that will be executed by an efficient local model, before touching code
---

# Writing Plans (Small Models)

Turn an approved spec into a plan directory the executor cannot get wrong.

The executor is a small model. It will faithfully copy whatever code the
plan contains - so a plan bug ships as code. Every rule below exists
because a real run shipped bugs this way. Follow them literally.

**Announce at start:** "I'm using writing-plans to create the plan."

## Inputs

You need an approved spec (from brainstorming) containing an
Acceptance Criteria section.

- If the spec has no Acceptance Criteria, STOP and tell the user - do not
  invent them silently.
- IMPLEMENTABILITY CHECK: every Acceptance Criterion must be implementable
  from the spec's Design section. If a criterion's mechanism (function,
  field, discovery path, flow step) does not exist in the Design, STOP and
  ask the user - either the Design grows or the criterion is dropped.
  Do not invent mechanisms to make a criterion passable.
- CONSTRAINT TRACEABILITY: constants come from the spec's `## Constants`
  section. Copy each one 1:1 into index.md's Global Constraints AND the
  Constraint Coverage table - same name, same value, same verifying AC.
  A spec constant missing from the plan = STOP. A constraint with no
  verifying criterion = STOP, ask the user to add the criterion.

## Plan Directory (always this shape)

```
docs/superpowers/plans/YYYY-MM-DD-<feature>/
  index.md          # spec path, goal, global constraints, execution order,
                    # Spec Coverage + Constraint Coverage tables. NO code.
  interfaces.md     # EVERY shared type, function, constant - COMPLETE code
  tasks/
    task-01-<name>.md   # self-contained, loadable alone
```

`index.md` MUST start with the spec path right after the title:

```markdown
**Spec:** docs/superpowers/specs/<spec-file>.md
```

and MUST end with the `## Spec Coverage` and `## Constraint Coverage`
tables (filled in during self-review - see the end of this skill).

Split plans into multiple files. One task file per task. If a task file
exceeds ~150 lines, split the task.

## The Iron Rule: Copy, Never Re-type

All shared code lives in `interfaces.md` as COMPLETE implementation code.

- STUBS ARE FORBIDDEN - IN ANY DISGUISE: a function body of `...`, of
  "TODO", or of ONLY A DOCSTRING in interfaces.md means the code does
  not exist yet. A docstring-only body silently returns None and passes
  naive `...` greps - it is the most dangerous stub form. Stubs make
  "copy from interfaces" impossible, force the tasks to re-type code,
  and re-typed code drifts - that drift is how thresholds, wire formats,
  and constants silently vanish. Write the full body or do not finish.
- Task files contain TEST code and step instructions only.
- If a task needs code that is not in `interfaces.md`: add it there FIRST
  (complete), then reference it from the task.
- Never write the "same" code twice from memory. The executor cannot
  reconcile two diverging copies - it will ship one of them blindly.
- A dataclass field the spec requires (a dedupe flag, a registry handle)
  must appear in `interfaces.md` as a named field on its state object -
  NEVER as a local variable inside example code.
- Every constant (tags, thresholds, defaults) is defined ONCE in
  interfaces.md and referenced by name everywhere else.
- Each task file has ONE header block (`# Task N` with Files/Interfaces),
  then the steps. Never repeat the header a second time inside the file.

## Message Schema Rule

Anything appended to `message["content"]` must be a schema the model
endpoint accepts - a plain string, or a list of typed parts
(`{"type": "text", ...}` / `{"type": "image_url", ...}`). If the design
introduces a custom content shape (tagged dicts, wrapper objects), the
plan may not use it unless the spec justifies it AND an Acceptance
Criterion pins the exact shape. A content shape no AC covers ships
broken and no gate will see it.

## Task Template (every task, every time)

````markdown
### Task N: <name>

**Files:**
- Create/Modify: `exact/path.py`
- Test: `tests/exact/path_test.py`

**Interfaces:**
- Consumes: exact signatures from earlier tasks
- Produces: exact signatures later tasks rely on

- [ ] Step 1: Write the failing test
      (full test code in the plan - no "write tests for the above")

- [ ] Step 2: RED GATE - run it, expect failure
      Run: `<exact command>`
      Expected output: FAIL with `<exact message>`
      PASTE the output. A test that passes before implementation exists
      is VACUOUS - delete it and write one that fails.

- [ ] Step 3: Implement (reference interfaces.md - do not re-type code)

- [ ] Step 4: GREEN - run again
      Run: `<exact command>`
      Expected output: PASS
      PASTE the output.

- [ ] Step 5: Commit (exact git command)
````

### Test Quality Rules (Step 1)

- The test must assert BEHAVIOR: an input and its expected output/effect.
  Existence-only assertions (`assert callable(f)`, `assert x is not None`)
  prove nothing and are forbidden as a task's primary test.
- Any feature with memory (dedupe, counters, caches, registries) gets a
  test that calls it TWICE through the SAME instance: once to establish
  state, once to prove the state changed the outcome. Assert the FIRST
  call's effect before asserting the second.
- Exception: a task that ONLY adds tests for already-built components may
  skip Steps 1-2 (RED), but then its gate is the FULL test suite plus
  mypy, and the task must say so explicitly in its verify steps.

## Verification Rules Per Task

1. Every task's Verify block includes at least one BEHAVIOR check.
   A type-checker alone never verifies behavior.
2. REAL-ARTIFACT GATE - mandatory when the task creates or modifies files
   that SHIP with the repo (data directories, configs, templates, docs)
   or migrates data. The verify block must run the REAL loader over the
   REAL paths and assert the exact expected count:

   ```bash
   uv run python -c "<import the real loader>; n = <count entries over the real shipped paths>; assert n == <EXPECTED>, n; print('real-artifact OK:', n)"
   ```

   Adapt the loader import to the feature; the `assert n == <EXPECTED>`
   and the printed count are mandatory. Synthetic tmp-dir fixtures never
   satisfy this gate. The EXPECTED count must match the repo's real
   content - verify it by listing the files before writing the assert.
3. Every verify step names the failure mode it catches. If you cannot
   name what bug a step would catch, delete the step and write one that
   can.
4. The FINAL task of every plan runs the full test suite AND mypy (or the
   project's type-check command) as its closing gate. Run formatters in
   check mode there (`ruff check .`), never with auto-fix - a verify step
   must not mutate the code it verifies.

## No Placeholders

Never write: "TBD", "TODO", "implement later", "add appropriate error
handling", "write tests for the above", "similar to Task N". Every code
step shows the full code or an explicit reference to interfaces.md. Every
verify step shows the exact command and expected output.

## Self-Review (run the commands, produce the artifact)

1. SPEC COVERAGE TABLE - one row per spec Acceptance Criterion, appended
   to index.md:

   ```markdown
   ## Spec Coverage
   | AC (INPUT ⇒ EXPECTED, verbatim from spec) | Task | Verify step |
   |-------------------------------------------|------|-------------|
   ```

   FIDELITY RULE: the named test must reproduce the AC's stated INPUT
   exactly - same counts, same shapes, same constants. A test that
   substitutes smaller inputs does not satisfy the row; fix the test or
   the AC.
   Every row must name a task and a verify step. An AC with no task is a
   STOP: go back, add the task (and any interfaces.md code it needs), or
   ask the user to drop the criterion. Never ship a plan with an unmapped
   criterion.

2. CONSTRAINT COVERAGE TABLE - one row per Global Constraint / behavior
   constant, appended to index.md below the Spec Coverage:

   ```markdown
   ## Constraint Coverage
   | Constraint | Verifying AC | Falsifier (what fails if the value changes) | Task | Verify step |
   |------------|--------------|-----------------------------------------------|------|-------------|
   ```

   A constraint with no verifying AC is a STOP: ask the user to add the
   criterion. This is how "min score 2.0" class bugs die.
   FIDELITY RULE: every row of the spec's `## Constants` section must
   appear here 1:1 - same name, same value, same verifying AC. A
   Constants row with no Constraint Coverage row = STOP.
   FALSIFIABILITY RULE: the Falsifier cell names the exact input or
   assertion in the named test that depends on the constant's value
   (e.g. "entry scoring 1.0 must be excluded"). If altering or deleting
   the constant would NOT fail the test, the reference is false - the
   test tests something else. STOP and add a test that genuinely
   exercises the constant, or ask the user for the criterion.
   GROUNDING RULE: the Falsifier cell must describe data that LITERALLY
   appears in the named test's code. If the Falsifier says "entry with
   score 1.5", the test body must contain an entry scored 1.5. Check:
   every number/value in the Falsifier cell must be findable in the
   test's source. A Falsifier describing data the test does not contain
   is a false reference wearing a true sentence - the test tests
   something else. STOP and write the test that contains the falsifying
   data.

3. STUB + RE-TYPE SCAN - run this (adapt <dir>); both outputs must be EMPTY:

   ```bash
   uv run python - <<'EOF'
   import ast, re
   from pathlib import Path
   d = Path("docs/superpowers/plans/<dir>")
   names = []
   for block in re.findall(r"```python\n(.*?)```", d.joinpath("interfaces.md").read_text(), re.S):
       try:
           tree = ast.parse(block)
       except SyntaxError:
           continue
       for node in tree.body:
           if isinstance(node, (ast.FunctionDef, ast.ClassDef)):
               names.append(node.name)
               body = node.body
               if len(body) == 1 and isinstance(body[0], ast.Expr) and isinstance(body[0].value, ast.Constant):
                   print(f"STUB: {node.name}")
   for f in sorted(d.joinpath("tasks").glob("*.md")):
       for n in names:
           if re.search(rf"^(def|class) {n}\b", f.read_text(), re.M):
               print(f"RE-TYPED in {f.name}: {n}")
   EOF
   ```

   STUB = a top-level function or class whose body is only a docstring
   or `...` - the code does not exist; docstring-only stubs return None
   and pass naive `...` greps. RE-TYPED = an interfaces.md name defined
   again inside a task file - two diverging copies. Both are STOP
   conditions: write the full body in interfaces.md, delete the task
   copy, reference interfaces.md instead.

4. Duplicate sections: for each heading in index.md run
   `rg -c "^## <heading>" index.md` - every count must be 1.

5. Single-header check: for every task file,
   `rg -c "^\*\*Files:\*\*" docs/superpowers/plans/<dir>/tasks/task-N.md`
   must be exactly 1. Two hits = duplicated header block - delete the copy.

6. Interfaces consistency: for every function/constant in interfaces.md,
   `rg "<name>" tasks/` must show references, never a re-typed body.
   Any re-typed copy = delete it and reference interfaces.md.

7. Placeholder scan: `rg -n "TBD|TODO|later|appropriate" docs/superpowers/plans/<dir>/`
   must return nothing.

8. Existence-test scan: `rg -n "assert callable|assert .* is not None" docs/superpowers/plans/<dir>/tasks/`
   - every hit must be replaced by a behavior assertion.

## Handoff - STOP Gate

Do NOT start executing. Do NOT invoke executing-plans on your own.

Say: "Plan saved to <dir>. Review it - at minimum the Spec Coverage and
Constraint Coverage tables - and say go when you want execution."

Then STOP and wait for the user's explicit approval. The spec had a review
gate; the plan must have one too. An unreviewed plan executed immediately
throws away the cheapest moment to catch a plan bug.
