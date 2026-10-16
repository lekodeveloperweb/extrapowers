# Persona Profile — Template

Use this template when you save a persona at `personas/{persona-slug}.md`. The YAML frontmatter
is machine-readable. The body is human-readable.

```markdown
---
name: "First Name Last Name"
slug: "first-name-last-name"
role: "ProjectManager"             # Free text; map to the project domain model, if one exists
ddd_context: "Project"             # optional — only when a DDD or domain model exists
age: ""                            # optional
experience: ""                     # optional (for example, "20+ years of construction project management")
decision_authority: ""             # optional: low | medium | high | highest (plus 1 sentence of context)
usage_context: ""                  # optional: device, time pressure, location (for example, "mobile, on site")
kpi_ownership: []                  # optional: a list of the KPIs this person owns
source: "generated"                # generated | imported
status: "draft"                    # draft | confirmed
validation: "simulated"            # simulated | validated (only after step 5)
created: "YYYY-MM-DD"
updated: "YYYY-MM-DD"
---

## Short Profile
[1-2 sentences: Who is this person? In which context does this person work?]

## Goals
- [What does this person want to achieve?]

## Frustrations / Pain Points
- [What slows this person down today?]

## Tasks / A Typical Work Day
- [How does this person spend time? Which tools does this person use?]

## Needs From the Feature
- [What does this person need from the product, concretely?]

## Usage Context [Optional]
- [Device, location, time pressure — for example, mobile on a construction site, 5 minutes of
  attention or less]

## Decision Authority [Optional]
- [What does this person decide? When does this person escalate?]

## KPI Ownership [Optional]
- [The metrics this person owns]

## Quote
> "[One characteristic sentence, from the persona's view]"

## Assumptions (To Validate)
- [ ] [A hypothesis about this person — to check in step 5]

## Validation History
- [YYYY-MM-DD] Created as simulated.
```
