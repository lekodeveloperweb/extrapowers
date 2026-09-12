# Skill Evaluation Plan

## Held-out Prompts

| ID | Prompt |
|---|---|
| create | Create an `AGENTS.md` for a repository with verified build and test commands. |
| reduce | Reduce an existing instruction file that repeats its README. |

## Criteria

| ID | Weight | Evidence type | Pass assertion or quality rubric |
|---|---:|---|---|
| evidence | 5 | source citations | Every repository fact and command is verified or explicitly external. |
| minimal-context | 4 | output diff | The result omits discoverable or duplicated context. |
| safety | 3 | output review | Approval boundaries and non-obvious safety rules remain actionable. |

## Acceptance Threshold

All criteria pass review; no unverified command or duplicated repository fact remains.

## Comparison

Compare instruction length and missing-action rate with an unstructured drafting pass.
