---
name: agent-clean-code
description: Optimizes code structure and documentation for AI agent readability and reasoning. Use when refactoring codebases for agent-assisted development, setting up project rules like CLAUDE.md or AGENTS.md, or reviewing agent-generated code.
---

# Agent Clean Code

## Quick start

To make code "Agent-Ready", apply these core constraints immediately:

1. **Small Units**: Functions 4-20 lines; Files \< 500 lines.  
2. **Unique Names**: Use UserRegistrationValidator, not Validator.  
3. **Explicit Types**: No any, no untyped Python/JS.  
4. **Context Comments**: Explain *Why*, not *What*.

## Workflows

### Refactoring for Agent Reasoning

* **Audit**: Run node scripts/check-limits.js \<file\> to find "Agent Debt."  
* **Shrink**: Break 100+ line functions into smaller tool-callable units.  
* **Type**: Add TypeScript interfaces or Python type hints.  
* **Uniquify**: Rename generic variables to searchable terms.  
* **Document**: Add docstrings with usage examples for the instant intent signal.

### Initializing a Project for Agents

* Create agent instruction files (e.g., CLAUDE.md, AGENTS.md) using the template in [REFERENCE.md](./REFERENCE.md).  
* Add the check-limits.js utility to the scripts/ directory for automated compliance.  
* Ensure test commands are headless and documented in the README.

## Advanced features

Detailed principles, project-rule templates, and deeper justifications are available in [REFERENCE.md](./REFERENCE.md).
