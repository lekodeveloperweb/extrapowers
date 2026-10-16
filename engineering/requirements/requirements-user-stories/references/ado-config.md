# Ticket System — Target Configuration

> Warning: Confirm the organization and project before every write action.

| Key | Value |
|-----|-------|
| Organization | `[Project-specific: fill in]` |
| Project | `{{PROJECT_NAME}}` (team-provided; confirm before writing) |
| Team | `{{PROJECT_NAME}} Team` (team-provided) |
| Backlog URL | `[Project-specific: fill in]` |
| Connection | Ticket system MCP server (for example `ado-mcp` for Azure DevOps) |

## Rules
- Never create work items before you confirm the organization and the project.
- Enforce parent linking: **Epic → Feature → User Story**.
- Keep traceability: need → slice → epic ID → feature ID → story ID.
