# User Story: [User Story Title]

> File name: `docs/plans/workitems/userstory_YYYYMMDD_{slug}_{nr}.md`

## Ticket System Fields

| Field | Value |
|------|------|
| Title | [User story title] |
| Area Path | {{PROJECT_NAME}} |
| Iteration Path | {{PROJECT_NAME}}\Iteration [number] |
| State | New |
| Priority | [1–4] |
| Story Points | [1 / 2 / 3 / 5 / 8 / 13] |
| Parent Feature | [Feature title / feature ID] |

---

## User Story

As a **[role]**, I want **[goal]**, so that **[benefit]**.

## Description

[Additional context, background, constraints]

## Acceptance Criteria

**AC-01** — [Short title]
```
Given [starting state]
When  [user action]
Then  [expected result]
```

**AC-02** — [Short title]
```
Given [starting state]
When  [user action]
Then  [expected result]
```

## EARS Requirements
> Fill this section only when real-time, reactive, or safety-critical behavior was confirmed relevant in Step 3.6.

<!-- EARS-01 --> The `<System Name>` shall `<System Response>`
<!-- EARS-02 --> When `<Event>`, the `<System Name>` shall `<System Response>`
<!-- EARS-03 --> While `<State>`, the `<System Name>` shall `<System Response>`
<!-- EARS-04 --> If `<Unwanted Condition>`, then the `<System Name>` shall `<System Response>`
<!-- EARS-05 --> Where `<Feature>`, the `<System Name>` shall `<System Response>`

## Security Considerations (OWASP ASVS)
> Fill this section only when security-relevant aspects were confirmed relevant in Step 3.6.

| ASVS ID | Level | Category | Requirement | Verification |
|---------|-------|----------|-------------|--------------|
| [V2.x] | [1 / 2 / 3] | Authentication | [Control description] | [How it will be verified] |
| [V5.x] | [1 / 2 / 3] | Input Validation | [Control description] | [How it will be verified] |

## Test Strategy

- **Unit test**: [What does the unit test cover?]
- **Integration**: [What does the integration test cover?]
- **E2E**: [Which user flow does the E2E test cover?]

## Design / Mockups

- Prototype: [link / file name, if available]
- Components: [Which UI components / design system classes]

## Dependencies

- [Dependency 1]

## Definition of Done

- [ ] Code implemented
- [ ] Unit tests (coverage over 80%)
- [ ] Integration tests
- [ ] Code review approved
- [ ] All ACs met
- [ ] Documentation updated
- [ ] Deployed and tested in staging
