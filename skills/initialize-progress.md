# Initialize Progress

Use this skill to create `learn/<instance>/sessions.md` before the first lesson.

## Inputs

- `learn/<instance>/profile.md`
- `learn/<instance>/curriculum.md`
- `templates/sessions-template.md`

## Workflow

1. Identify the first lesson ID and title from the curriculum.
2. Create a session log using the template.
3. Set completed lessons to none.
4. Set current lesson to the first lesson.
5. Add an initial note with the course start context if useful.

## Constraints

- Do not mark lessons complete during initialization.
- Keep the file ready for append-only updates.
