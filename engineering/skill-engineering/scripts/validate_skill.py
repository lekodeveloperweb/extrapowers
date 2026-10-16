#!/usr/bin/env python3
"""Validate structural requirements and workflow contracts of a local skill."""

from __future__ import annotations

import argparse
import re
import tomllib
from pathlib import Path
from typing import Any


EVALUATION_PLAN_MARKERS = {
    "## Held-out Prompts",
    "## Criteria",
    "## Acceptance Threshold",
    "## Comparison",
}


def read_frontmatter(skill_file: Path) -> dict[str, str]:
    lines = skill_file.read_text(encoding="utf-8").splitlines()
    if len(lines) < 3 or lines[0] != "---":
        raise ValueError("missing YAML frontmatter")

    try:
        end = lines.index("---", 1)
    except ValueError as error:
        raise ValueError("unterminated YAML frontmatter") from error

    values: dict[str, str] = {}
    for line in lines[1:end]:
        match = re.fullmatch(r"([a-z-]+):\s*(.+)", line)
        if match:
            values[match.group(1)] = match.group(2).strip().strip('"')
    return values


def _workflow_contract_failures(skill_dir: Path) -> list[str]:
    failures: list[str] = []
    reward_file = skill_dir / "references" / "reward.toml"
    if not reward_file.is_file():
        return ["workflow-invoked skills require references/reward.toml"]

    try:
        contract: dict[str, Any] = tomllib.loads(reward_file.read_text(encoding="utf-8"))
    except tomllib.TOMLDecodeError as error:
        return [f"invalid reward.toml: {error}"]

    settings = contract.get("contract")
    if not isinstance(settings, dict) or settings.get("version") != 2:
        failures.append("reward.toml requires contract.version = 2")
    if not isinstance(settings, dict) or not isinstance(settings.get("phase"), str):
        failures.append("reward.toml requires contract.phase")
    if not isinstance(settings, dict) or not isinstance(settings.get("weighted_gte"), int):
        failures.append("reward.toml requires integer contract.weighted_gte")

    gates = contract.get("native_gate")
    if not isinstance(gates, list) or not gates:
        failures.append("reward.toml requires at least one native_gate")
    else:
        for gate in gates:
            if not isinstance(gate, dict) or not isinstance(gate.get("name"), str):
                failures.append("each native_gate requires a name")
                continue
            if gate.get("kind") not in {"artifact", "receipt"}:
                failures.append(f"native_gate {gate['name']} has unsupported kind")
            if gate.get("kind") == "receipt" and not isinstance(gate.get("path"), str):
                failures.append(f"receipt gate {gate['name']} requires a path")

    criteria = contract.get("criterion")
    if not isinstance(criteria, list) or not criteria:
        failures.append("reward.toml requires at least one criterion")
    else:
        for criterion in criteria:
            if not isinstance(criterion, dict) or not isinstance(criterion.get("name"), str):
                failures.append("each criterion requires a name")

    artifacts = contract.get("artifact")
    if not isinstance(artifacts, list) or not artifacts:
        failures.append("workflow-invoked skills require at least one artifact contract")
        return failures

    for artifact in artifacts:
        if not isinstance(artifact, dict) or not isinstance(artifact.get("path"), str):
            failures.append("each artifact requires a path")
            continue
        artifact_path = Path(artifact["path"])
        template = skill_dir / "templates" / artifact_path.name
        if not template.is_file():
            failures.append(f"artifact {artifact['path']} has no matching template {template.name}")
            continue

        template_text = template.read_text(encoding="utf-8")
        markers = artifact.get("required_markers")
        if not isinstance(markers, list) or not all(isinstance(marker, str) for marker in markers):
            failures.append(f"artifact {artifact['path']} requires string required_markers")
            continue
        for marker in markers:
            if marker not in template_text:
                failures.append(f"artifact {artifact['path']} marker missing from template: {marker}")

        template_headings = set(re.findall(r"^## .+$", template_text, flags=re.MULTILINE))
        uncontracted_headings = sorted(template_headings - set(markers))
        if uncontracted_headings:
            failures.append(
                f"artifact {artifact['path']} template headings missing from required_markers: "
                + ", ".join(uncontracted_headings)
            )
    return failures


def _table_rows(content: str, heading: str) -> list[list[str]]:
    section = content.split(heading, 1)[1].split("\n## ", 1)[0]
    rows = []
    for line in section.splitlines():
        compact = line.replace("|", "").replace(" ", "").strip()
        if not line.startswith("|") or set(compact) <= {"-", ":"}:
            continue
        cells = [cell.strip() for cell in line.strip().strip("|").split("|")]
        if cells and cells[0] != "ID":
            rows.append(cells)
    return rows


def _evaluation_plan_failures(skill_dir: Path) -> list[str]:
    plan = skill_dir / "references" / "evaluation-plan.md"
    if not plan.is_file():
        return ["evaluation plan required at references/evaluation-plan.md"]
    content = plan.read_text(encoding="utf-8")
    missing = sorted(marker for marker in EVALUATION_PLAN_MARKERS if marker not in content)
    failures = [f"evaluation plan missing marker: {marker}" for marker in missing]
    if missing:
        return failures
    prompts = _table_rows(content, "## Held-out Prompts")
    criteria = _table_rows(content, "## Criteria")
    if len(prompts) < 2:
        failures.append("evaluation plan requires at least two held-out prompts")
    if not criteria:
        failures.append("evaluation plan requires at least one criterion")
    for criterion in criteria:
        if len(criterion) != 4 or not criterion[0] or not criterion[2] or not criterion[3]:
            failures.append("evaluation plan criteria require id, weight, evidence type, and pass assertion")
            continue
        try:
            if int(criterion[1]) < 1:
                raise ValueError
        except ValueError:
            failures.append(f"evaluation plan criterion {criterion[0]} requires positive integer weight")

    if skill_dir.parent.name == "workflow-invoked":
        reward = tomllib.loads((skill_dir / "references" / "reward.toml").read_text(encoding="utf-8"))
        expected = {item["name"] for item in reward.get("criterion", [])}
        declared = {item[0] for item in criteria if item}
        if expected != declared:
            failures.append("evaluation plan criterion IDs must match reward.toml criteria")
    return failures


def validate(skill_dir: Path, *, require_evaluation_plan: bool = True) -> list[str]:
    failures: list[str] = []
    skill_file = skill_dir / "SKILL.md"
    if not skill_file.is_file():
        return [f"missing {skill_file}"]

    try:
        frontmatter = read_frontmatter(skill_file)
    except ValueError as error:
        return [str(error)]

    if frontmatter.get("name") != skill_dir.name:
        failures.append(f"name must match directory: {skill_dir.name}")
    if not frontmatter.get("description"):
        failures.append("description is required")
    if len(skill_file.read_text(encoding="utf-8").splitlines()) > 500:
        failures.append("SKILL.md exceeds 500 lines; move conditional detail to references")
    if skill_dir.parent.name == "user-invoked" and not (
        skill_dir / "references" / "agent-design-card.md"
    ).is_file():
        failures.append("user-invoked skills require references/agent-design-card.md")
    if skill_dir.parent.name == "workflow-invoked":
        failures.extend(_workflow_contract_failures(skill_dir))
    if require_evaluation_plan and skill_dir.parent.name in {
        "workflow-invoked", "user-invoked", "agentic-engineering"
    }:
        failures.extend(_evaluation_plan_failures(skill_dir))
    return failures


def main() -> int:
    parser = argparse.ArgumentParser(description="Validate a local skill package.")
    parser.add_argument("--skill", required=True, type=Path)
    plan_group = parser.add_mutually_exclusive_group()
    plan_group.add_argument(
        "--require-evaluation-plan",
        action="store_true",
        default=True,
        help="Require the standard structured evaluation plan (default).",
    )
    plan_group.add_argument(
        "--no-require-evaluation-plan",
        action="store_false",
        dest="require_evaluation_plan",
        help="Skip evaluation-plan validation for migration only.",
    )
    args = parser.parse_args()

    failures = validate(args.skill.resolve(), require_evaluation_plan=args.require_evaluation_plan)
    if failures:
        print("INVALID")
        print("\n".join(f"- {failure}" for failure in failures))
        return 1

    print("VALID")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
