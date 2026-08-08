# Run Learning Session

Use this skill to teach the current lesson from an active learning instance.

## Inputs

- `learn/<instance>/profile.md`
- `learn/<instance>/curriculum.md`
- `learn/<instance>/sessions.md`

## Workflow

1. Determine the current lesson from `sessions.md`.
2. Read the learner's preferred language from `profile.md`.
3. Read the lesson unit in `curriculum.md`.
4. Teach the required explanation using the learner's preferred language as the main communication language unless the user requests otherwise.
5. Use the lesson example or scenario.
6. Give the learner the planned practice.
7. Assess the response against the lesson objective.
8. Use `skills/update-progress.md` to append the session result.

## Teaching Rules

- Keep the session centered on the lesson objective.
- Use the learner's preferred language for teaching, questions, feedback, and summaries by default.
- Keep technical terms in another language only when useful, and explain them in the preferred language.
- Adapt examples to the learner's interests where useful.
- Preserve topic-specific safety and boundary rules from the curriculum.
- If the learner is stuck, scaffold with hints before giving full answers.
