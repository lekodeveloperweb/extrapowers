# Extrapowers

> A curated collection of Agent Skills for software developers — designed to work with small, locally-running LLMs that have limited context windows.

## What is Extrapowers?

Extrapowers is an aggregator of **Agent Skills** — structured, reusable workflows that guide coding agents through complex development tasks. Each skill is a self-contained `SKILL.md` file that teaches an AI assistant how to approach a specific type of work, from brainstorming features to systematic debugging.

These skills are built for **small local models** (like those running on consumer hardware) that can't handle massive context. By breaking work into bounded, deterministic steps, each skill fits within tight context limits while still producing professional-grade results.

## How It Works

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│  Brainstorm │ ──▶ │  Write Plan  │ ──▶ │ Execute Plan │
│   (idea)    │     │ (deterministic)│     │ (verify)    │
└─────────────┘     └──────────────┘     └─────────────┘
```

Each skill follows a Socratic workflow: extract context, grill with targeted questions, anchor to standards, draft artifacts, and verify. The result is a repeatable, auditable process that small models can execute faithfully.

## Skills Library

### Engineering Workflows

Core development skills for the software engineering lifecycle:

| Skill | Description |
|-------|-------------|
| **brainstorming** | Turn ideas into testable specs with Acceptance Criteria before any code |
| **writing-plans** | Convert approved specs into executable task plans with full interface contracts |
| **executing-plans** | Execute plans task-by-task with evidence-based verification and audit trails |
| **systematic-debugging** | Find root causes before fixing — four-phase process that prevents random patching |
| **test-driven-development** | Write tests first, implement after — the red-green-refactor cycle |
| **verification-before-completion** | Prove you're done before claiming done |
| **using-git-worktrees** | Parallel development without branch pollution |
| **finishing-a-development-branch** | Clean completion patterns for safe merges |
| **requesting-code-review** | Structure reviews for maximum signal |
| **receiving-code-review** | Process feedback without ego |

### Skill Engineering

Build your own skills with these meta-skills:

| Skill | Description |
|-------|-------------|
| **skill-engineering** | Create bounded, validated skills through Socratic design |
| **agentsmd-creation** | Craft minimal, evidence-based AGENTS.md for coding agents |

### Requirements Engineering

Structured approaches to requirements work:

| Skill | Description |
|-------|-------------|
| **requirements-ideation** | Explore and shape requirements |
| **requirements-persona** | Define user personas for requirement context |
| **requirements-user-stories** | Write testable user stories |
| **requirements-review** | Review requirements for clarity and completeness |
| **requirements-engineer** | Full requirements engineering workflow |

### Technology-Specific Skills

Skills organized by technology stack (contributions welcome):

| Category | Skills |
|----------|--------|
| **React** | vercel-composition-patterns, vercel-react-best-practices |
| **Python** | _(placeholder)_ |
| **Go** | _(placeholder)_ |
| **Rust** | _(placeholder)_ |
| **Vue.js** | _(placeholder)_ |
| **Angular** | _(placeholder)_ |
| **Flutter** | _(placeholder)_ |
| **.NET** | _(placeholder)_ |
| **Algorithms** | _(placeholder)_ |
| **Web Development** | _(placeholder)_ |
| **Software Architecture** | _(placeholder)_ |
| **Design Patterns** | _(placeholder)_ |

## Why Small Models?

Small local LLMs offer privacy, zero API costs, and offline operation. But they need **structured guidance** to compensate for limited context. Extrapowers provides that structure.

Each skill:
- **Fits context windows** — bounded workflows that don't overflow
- **Prevents drift** — deterministic steps small models can follow faithfully
- **Enables verification** — every output is checkable, every claim auditable
- **Reduces hallucination** — explicit constraints leave less room for invention

## Project Structure

```
extrapowers/
├── engineering/           # Core engineering and meta-skills
│   ├── superpowers/       # Development workflow skills
│   ├── skill-engineering/ # Skill creation framework
│   ├── agentsmd-creation/ # AGENTS.md generation
│   └── requirements/      # Requirements engineering
├── react/                 # React-specific skills
│   ├── vercel-composition-patterns/
│   └── vercel-react-best-practices/
├── python/                # _(placeholder)_
├── golang/                # _(placeholder)_
├── rust/                  # _(placeholder)_
├── vuejs/                 # _(placeholder)_
├── angular/               # _(placeholder)_
├── flutter/               # _(placeholder)_
├── dotnet/                # _(placeholder)_
├── algorithm/             # _(placeholder)_
├── web-development/       # _(placeholder)_
├── software-architecture/ # _(placeholder)_
└── design-pattern/        # _(placeholder)_
```

## Using These Skills

Each skill is a `SKILL.md` file that can be loaded by compatible AI coding assistants (like L-Coder, Claude Code, or other agent frameworks). The skill defines:

- **Frontmatter**: Name, description, and trigger conditions
- **Workflow**: Step-by-step process with gates and handoffs
- **References**: Supporting documents and templates
- **Validation**: Scripts and checks to verify correctness

To use a skill, simply reference it by name in your agent:

```
Use superpowers:brainstorming to turn this feature idea into a spec
```

## Contributing

New skills are welcome! To create a new skill:

1. Create a directory under the appropriate category
2. Add a `SKILL.md` with frontmatter and workflow
3. Add any `references/` or `scripts/` the skill needs
4. Submit a pull request

Or use the **skill-engineering** skill to guide you through the process.

## License

[MIT](./LICENSE)
