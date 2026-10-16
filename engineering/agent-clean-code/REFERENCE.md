# **Agent Clean Code: Detailed Principles**

This reference expands on the 13 points of re-ranked Clean Code principles optimized for LLM agents.

## **1 The Hierarchy of Needs (Re-ranked)**

| Priority | Principle | Why for Agents? |
| :---- | :---- | :---- |
| **High** | Small Units | Fits in context window/tool calls without truncation. |
| **High** | Unique Naming | Makes grep searches return high-signal results. |
| **High** | Explicit Types | Prevents reasoning errors caused by type inference. |
| **Med** | Contextual Comments | Provides "provenance" (the *Why*) that isn't in the code. |
| **Med** | TDD / Testing | Acts as a safety net for agent "hallucinations." |
| **Low** | Style/Formatting | Agents handle any style; let auto-formatters do the work. |

## **2 Automation: Using the check-limits.js Script**

The script provided in scripts/check-limits.js should be used during the **Audit** and **Validation** phases.

### **When to use:**

* **During Refactoring**: Before asking an agent to clean up a file, run the script to identify specific lines that exceed agent reasoning limits.  
* **Pre-Commit**: Include it in your CI/CD or pre-commit hooks to ensure human-written or agent-written code stays within the 4-20 line function limit.

### **Usage:**

```bash

heck a specific file (JS, TS, Python, C#, Java, etc.)
node scripts/check-limits.js path/to/your/file.ext

# Check an entire project directory recursively
node scripts/check-limits.js .

# Override default limits
node scripts/check-limits.js ./src --func-limit=15 --file-limit=300

```

## **3 Project Rules Template (CLAUDE.md / AGENTS.md)**

Copy this into your project root (as CLAUDE.md, AGENTS.md, or inside .cursor/rules):  
## Agent Rules  
- **Functions**: 4-20 lines. Split if longer.  
- **Files**: Under 500 lines.   
- **Validation**: Run `node scripts/check-limits.js` to verify these limits.  
- **Types**: Always explicit. No `any`.  
- **Naming**: Must be unique/searchable (\>5 grep hits is a fail).  
- **Logic**: Early returns over nested if-statements (Max 2 levels).  
- **Comments**: Write WHY, not WHAT. Keep agent-authored comments.  
- **Tests**: Every fix needs a regression test. Run via `npm test` for javascript application, for example.

## **4 Testing & XP**

The agent must be able to run tests without human intervention.

* No manual DB seeding.  
* No hidden environment secrets.  
* Predictable output formats.
