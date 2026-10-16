# Persona System, Convergence, and Report (PRISMA-Adapted)

This is the reference for `re-requirements-review`. It is inspired by the EnSure PRISMA ADR-008
convergence principle.

## Base Personas (Always Active)

### Pragmatist (blue)
> *"Does this requirement deliver real value? I flag only real, demonstrable problems."*
- **Focus**: Deliverability, business value, feasibility. **Bias**: 0 (balanced).
- **Primary checks**: Business value clarity, story point plausibility, feasibility.

### Perfectionist (red)
> *"What could go wrong? I flag too much, rather than too little."*
- **Focus**: Completeness, edge cases, security, DDD consistency. **Bias**: −0.05 (conservative).
- **Primary checks**: GWT completeness, error paths, security, DDD consistency.

### Newcomer (yellow)
> *"What would I not understand, as a new team member? I flag only obvious gaps."*
- **Focus**: Clarity, precision, context completeness. **Bias**: +0.05 (precise).
- **Primary checks**: Clarity, missing definitions, vague terms, context gaps.

## Optional Character Types (Can Be Activated)
| Code | Persona | Focus | Bias |
|------|---------|-------|------|
| A · purple | Skeptic | Unsupported assumptions, implicit prerequisites, unchecked dependencies | −0.05 |
| B · green | Enthusiast | Value potential, missed opportunities, missing follow-on requirements | 0 |
| C · black | Devil's Advocate | Counter-arguments, cost/benefit imbalance, strategic doubts | −0.05 |
| D · brown | Conservative | Compatibility with existing work, consistency, migration/breakage risk | +0.05 |
| E · light blue | Nitpicker | Formats, naming, accuracy, attention to detail | −0.10 |
| F · orange | Pragmatic Builder | Implementation effort, simplicity, unneeded complexity, quick wins | 0 |

Once activated, a character type is treated in round 1 exactly like a base persona.

## Convergence Rules (ADR-008)
| Personas that agree | Severity | Label | Meaning |
|----------------|----------|-------|-----------|
| 1 persona | Low | `NOTE` | Informational, may be a false positive |
| 2 personas | Medium | `REVIEW` | A human should check it, likely real |
| 3 or more personas | High | `BLOCK` | Rework is required, a strong signal |

## Quality Criteria (9 Dimensions)
GWT quality, testability, DDD consistency, definition-of-ready score, story point plausibility,
business value, security (OWASP/RBAC/data protection), completeness (edge cases/error paths),
consistency (no duplication or conflict with existing artifacts).

## Configuration Dialog (Session Start)
```
── Requirements Review — {{PROJECT_NAME}} ─────────────
Active base personas: Pragmatist, Perfectionist, Newcomer (always active)

Optional character types — pick a selection mode:
  M  Manual     → you pick the optional character types yourself
  X  Automatic  → the AI picks the personas that fit the artifact type
  (ENTER = M)

If M — which types to add?
  A Skeptic         B Enthusiast          C Devil's Advocate
  D Conservative     E Nitpicker           F Pragmatic Builder
  (ENTER for none)

Minimum rounds: [2]

Artifact to review: enter a path, or paste the content.
─────────────────────────────────────────────────────
```

### Automatic Choice (X) — Mapping
| Artifact type | Activated optional personas | Reason |
|--------------|-------------------------------|-------|
| Prototype (lo-fi HTML) | Nitpicker, Pragmatic Builder | Attention to detail, plus the simplest build |
| User Story | Skeptic, Nitpicker | Assumptions in the ACs, plus exact GWT/format checks |
| Feature | Conservative, Pragmatic Builder | Consistency, plus the slice cut |
| Epic | Devil's Advocate, Conservative | Scope justification, plus compatibility |
| Slice(s) | Skeptic, Pragmatic Builder | Preconditions, plus feasibility |

## Round 1 — Independent Reviews
Each persona reviews **independently**:
```
## Pragmatist — Review
**Artifact**: [name]   **Focus**: [primary questions]
| # | Section / AC | Problem | Dimension | Confidence |
|---|----------------|---------|-----------|-----------|
**Summary**: [2–3 sentences]
```

## Round N — Convergence Layer
```
## Convergence Analysis — Round [N]
### Matches (2 or more personas)
| Problem | Personas | Severity | Label |
### Conflicts / discussion
### New findings this round
```
Stop when: 2 or more rounds ran, AND no new findings appeared.

## Report Structure (`docs/plans/reviews/review_YYYYMMDD_{slug}.md`)
```markdown
# Requirements Review Report
## Document Info
- Artifact type / file / date / active personas / review rounds
## Persona Reviews (Round 1)
## Convergence Layer
## Synthesis by Criterion
| Criterion | Score (1-10) | Findings | Convergence |
| … (9 dimensions) | | | |
| Overall definition-of-ready score | Average | | |
## Overall Verdict
Verdict: Ready / Needs work / Not ready, plus 2-3 sentences
## Recommended Actions (Prioritized)
| Priority | Action | Criterion | Source | Label |
```

## Rules
- Never touch production code or architecture. Every finding must point to one concrete section
  or AC.
- Drop any finding with a confidence below 0.55. Use a maximum of 10 findings per persona, per
  round.
