# Run Learning Session

Use this skill to teach the current lesson from an active learning instance.

## Inputs

- `learn/<instance>/profile.md`
- `learn/<instance>/curriculum.md`
- `learn/<instance>/sessions.md`

## Workflow

1. Determine the current lesson from `sessions.md`.
2. Read the lesson unit in `curriculum.md`.
3. Teach the required explanation in language appropriate to the learner profile.
4. Use the lesson example or scenario.
5. Give the learner the planned practice.
6. Assess the response against the lesson objective.
7. Use `skills/update-progress.md` to append the session result.

## Teaching Rules

- Keep the session centered on the lesson objective.
- Adapt examples to the learner's interests where useful.
- Preserve topic-specific safety and boundary rules from the curriculum.
- If the learner is stuck, scaffold with hints before giving full answers.
