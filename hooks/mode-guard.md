# Mode Guard Design

This documents the intended hook behavior. It is not executable hook code. Wire it into the Codex hook mechanism only after the hook schema is verified.

## Mode File

`.mode` is local JSON state:

```json
{ "dev": false }
```

Missing, unreadable, or invalid `.mode` defaults to learn mode.

## Modes

- Learn mode: `dev` is `false`.
- Dev mode: `dev` is `true`.

## Enforcement Policy

Learn mode allows writes only to:

- `.mode`
- the active instance's `learn/<instance>/sessions.md`

Learn mode blocks writes to:

- static framework files and directories
- `AGENTS.md`
- `docs/`
- `templates/`
- `skills/`
- `hooks/`
- `examples/`
- active instance `profile.md`
- active instance `curriculum.md`

Dev mode allows framework and instance edits, subject to normal repository safety rules.

## Active Instance

The active instance is selected by the router in `AGENTS.md`. A future hook implementation must use the same selection rule before allowing session writes.

## TODO

- Verify the Codex hook schema.
- Implement deterministic path checks.
- Add a clear blocked-write message explaining how to switch to dev mode.
