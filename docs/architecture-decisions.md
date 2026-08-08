# Architecture Decisions

## Static Framework And Dynamic Instances

The repository root is the static learning framework. It contains the router, skills, templates, docs, hooks design, examples, and package metadata.

Generated learner work belongs under `learn/`. That directory is ignored by Git because it is instance state, not framework source. A learning instance may be created, revised, and personalized without changing the shared framework.

## Instance Files

Each active learning instance uses these core files:

- `profile.md`: learner goals, background, constraints, preferences, and assessment notes.
- `curriculum.md`: lesson-centered plan with stable lesson IDs and teacher-facing guidance.
- `sessions.md`: append-only lesson session log and progress evidence.

Framework templates live in `templates/` and define the expected shape of these files.

## Mode Control

`.mode` is local runtime state and is ignored by Git. The intended v1 shape is:

```json
{ "dev": false }
```

Missing mode state defaults to dev mode so a freshly cloned framework can be maintained without bootstrapping local runtime state. Invalid mode state defaults to learn mode. Hook enforcement is the authority for write access:

- Learn mode permits learner session/progress updates for the active instance.
- Learn mode blocks framework, examples, profile, and curriculum edits.
- Dev mode permits framework and instance maintenance.

Hook behavior is enforced by a repo-local Codex `PreToolUse` hook registered in `.codex/config.toml` and implemented by `hooks/mode-guard.js`.

## Version Source

For v1, `package.json` is the canonical source of the framework version. Future release tags should match the package version.
