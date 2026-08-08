# Mode Command Design

This documents the intended `/mode` command behavior. It is not executable hook code. Wire it into the Codex hook mechanism only after the command schema is verified.

## State

The command reads and writes `.mode`:

```json
{ "dev": false }
```

Invalid or missing state is treated as learn mode.

## Commands

```text
/mode
```

Shows the current mode.

```text
/mode learn
```

Writes:

```json
{ "dev": false }
```

```text
/mode dev
```

Writes:

```json
{ "dev": true }
```

## Output

The command should report the resulting mode and the write policy at a high level.

## TODO

- Verify the Codex command and hook schemas.
- Implement the command with atomic `.mode` writes.
- Keep command behavior aligned with `hooks/mode-guard.md`.
