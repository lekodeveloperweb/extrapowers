---
name: troubleshooting-to-blog
description: Turn a completed debugging or incident-response session into a clear, evidence-based technical blog post. Use whenever the user asks to turn troubleshooting, a bug investigation, an outage, or a fix into an article, postmortem, or technical write-up, even if they do not say “blog post.” Capture the symptom, investigation, confirmed cause, fix, and verification; protect secrets; add the requested frontmatter; and always run the humanizer skill after drafting.
---

# Troubleshooting to technical blog post

Use the troubleshooting session as the source material. The post should let another engineer recognize the symptom, follow the evidence, understand the cause, and repeat the fix safely.

## Before drafting

1. Gather facts from the current conversation and any relevant command output, changed files, test results, logs, or linked documentation. Reuse the evidence already collected before asking the user to repeat steps.
2. Separate confirmed observations from hypotheses. Do not present a suspected cause as proven. If the incident remains unresolved, write that plainly and describe the next diagnostic step rather than inventing a resolution.
3. Protect credentials and personal data. Never copy access tokens, client secrets, API keys, passwords, private user data, or sensitive headers into the post. If the session exposed a credential, omit it and remind the user to revoke or rotate it. Redact transient identifiers such as request IDs unless they are needed and the user approves their inclusion.
4. Find the repository's existing blog/content conventions. Ask the user where to save the post before writing it, unless they already provided a path. Do not assume a `docs/blog/` directory.
5. Add YAML frontmatter by default with `title`, `category`, `summary`, `tags`, `date: 'YYYY-MM-DD'`, and `published: false`. Follow an existing category/tag taxonomy when one is present. If there is no taxonomy, use a plain category such as `Troubleshooting` and a short set of specific lowercase tags. Ask if a required metadata value cannot be inferred without guessing.

## Build the article

Use a narrative that fits the incident rather than forcing every heading. A useful starting sequence is:

1. **Title and opening:** name the concrete failure and give a short account of what eventually caused it.
2. **Context:** explain the relevant service, authentication or request flow, and what the system was expected to do.
3. **Evidence and investigation:** walk through the useful observations in order. Include commands and small, sanitized outputs that distinguish one hypothesis from another.
4. **Confirmed cause:** connect the evidence to the failure. Explain failed intermediate hypotheses when they help readers avoid the same detour.
5. **Fix:** give the specific configuration or code change, including its scope and security trade-offs.
6. **Verification:** show how to reproduce the original failure and confirm the fix. Include a short checklist when it helps.
7. **Security and references:** call out credential handling or other safety implications. Link to authoritative documentation used during the investigation.

The https://leko.ldw.solutions/posts/2026-09-29-cloudflare-blocked-keycloak-jwks.md post is an example of the intended shape: an initial audience-claim issue, continued 401s, a direct PyJWKClient failure, a Python-user-agent request reproducing Cloudflare 1010, a narrow Cloudflare Skip rule, and a successful retest. Keep these as evidence for that incident, not as boilerplate for unrelated posts.

Write for engineers who may not know this codebase. Define project-specific abbreviations on first use when needed. Keep commands, paths, claim names, response codes, and UI labels exact. Include enough context to make each command runnable, but do not dump whole logs when a few relevant lines establish the point.

## Humanizer review is required

After the first draft is written, load and follow the available `humanizer` skill. Review the whole article, not just its opening. Rewrite prose that sounds staged, repetitive, inflated, or formulaic while preserving every supported fact.

Follow the humanizer's file-mode rules: change prose only. Keep code blocks, inline code, commands, paths, data, and link targets unchanged. In particular, do not “improve” a command or metadata value during the prose pass. Re-read the finished post and check that the humanizer pass did not alter evidence or technical meaning. At the end you can review the YAML metadata, but only the title and the summary/excerpt/TLDR properties.

## Final checks

- The post distinguishes what was observed, what was inferred, and what was verified.
- No secrets, full JWTs, or unnecessary personal details remain.
- The fix is scoped accurately; avoid recommending broad security bypasses for a narrow problem.
- Commands and expected outputs match the session evidence.
- YAML frontmatter parses and uses the repository's conventions.
- The humanizer review has been completed after the draft, not skipped or folded into the initial writing pass.
- Tell the user the saved path and summarize the post. Do not publish or commit unless asked.

## Print publishing commands

After the post and Humanizer review are complete, print these two commands in the final response with `<post-path>` replaced by the actual saved file path, such as `docs/blog/<blog-title-slugfied>.md`. Do not execute them or claim the post has been published unless the user explicitly asks you to run them.

```bash
aws --profile <aws-profile> s3 cp <post-path> s3://<s3-bcket>/posts/
```
