# Update Progress

Use this skill after a learning session to append evidence to `learn/<instance>/sessions.md`.

## Inputs

- Current session interaction.
- Active lesson from `curriculum.md`.
- Existing `sessions.md`.

## Workflow

1. Append a new entry using `templates/sessions-template.md`.
2. Record what the learner did or said as evidence.
3. Summarize assessment, strengths, and difficulties.
4. Add corrections or clarifications.
5. Update the progress snapshot only as needed.
6. Set the next step to review, continue, or advance.

## Rules

- Treat session entries as append-only.
- Do not silently rewrite earlier evidence.
- Do not advance lessons unless the learner has met the current lesson objective.
