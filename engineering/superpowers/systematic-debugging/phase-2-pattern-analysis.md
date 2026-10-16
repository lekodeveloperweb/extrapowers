# Phase 2: Pattern Analysis

**Load this when:** in Phase 2 of systematic debugging — after root cause investigation, before forming hypothesis.

## Goal

Find the pattern before fixing.

## Steps

### 1. Find Working Examples
- Locate similar working code in same codebase
- What works that's similar to what's broken?

### 2. Compare Against References
- If implementing pattern, read reference implementation COMPLETELY
- Don't skim - read every line
- Understand the pattern fully before applying

### 3. Identify Differences
- What's different between working and broken?
- List every difference, however small
- Don't assume "that can't matter"

### 4. Understand Dependencies
- What other components does this need?
- What settings, config, environment?
- What assumptions does it make?

## Quick Reference

| Step | Action |
|------|--------|
| 1 | Find working examples in codebase |
| 2 | Read reference implementation completely |
| 3 | List every difference (no matter how small) |
| 4 | Document all dependencies and assumptions |
