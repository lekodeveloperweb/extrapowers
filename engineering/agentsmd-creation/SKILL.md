---
name: agentsmd-creation
description: Create or reduce a repository AGENTS.md using the agents.md standard and verified project evidence. Use when creating, auditing, shortening, or resolving conflicts in AGENTS.md instructions for coding agents.
disable-model-invocation: true
---

# AGENTS.md Creation

## WORKFLOW
1. **EXTRACT**: Identify target `AGENTS.md`, consumers, and whether this is a create, audit, or reduction. Read the existing target, root README, package/tool manifests, CI, and directly relevant scripts. Record only verified commands and conventions. Do not derive a repository overview from broad documentation.
2. **GROUND**: State target, consumers, confirmed commands, non-discoverable conventions, safety boundaries, and unresolved policy decisions. Do not change `.pi/AGENTS.md` when the target is a distributable project instruction file.
3. **GRILL**: Ask one pointed Socratic policy question at a time. Expose a trade-off and recommend a default. Ask at most seven questions; stop sooner when scope, retained policy, safety boundaries, and conflict resolution are settled. Never ask for repository facts that evidence can establish.
4. **ANCHOR**: Read `references/agentsmd-standard.md`; it is the single source of truth for content selection and minimal shape.
5. **CLASSIFY/DRAFT**: Draft the smallest `AGENTS.md` justified by verified repository evidence or an explicit user policy. Cite the source for every retained repository fact.
6. **RESOLVE/EVALUATE**: Existing repository evidence is authoritative for facts; the user decides policy. If target instructions conflict with verified commands, safety rules, or each other, show conflict, sources, and smallest alternatives. Ask one question; do not merge or overwrite the contradiction. Test the draft against two representative tasks: one needing a declared command and one routine task that should need no extra context.
7. **VERIFY/REPORT**: Confirm every command and path exists or is explicitly marked as an external requirement. Check that the result adds no README duplication and no generic style guide. Obtain approval before writing or replacing a project AGENTS.md. Report target, settled decisions, retained rules with evidence, removed redundant rules, unresolved conflicts, and verification commands.

## QUESTION FORMAT

`Q<n>/7 — <policy decision>: <question>. Default: <recommended choice>.`

## STOP

Stop after a conflict requiring a user decision or after an approved, verified
draft. At question seven, state remaining assumptions and draft; do not invent
project commands, conventions, or agent authority.
