# Build Learning Instance

Use this skill to create a new topic-agnostic learning instance under `learn/<instance>/`.

## Workflow

1. Select an instance slug from the learner topic or user request.
2. Use `skills/profile-learner.md` to create `profile.md` from `templates/profile-template.md`.
3. Use `skills/design-curriculum.md` to create `curriculum.md` from `templates/curriculum-template.md`.
4. Use `skills/initialize-progress.md` to create `sessions.md` from `templates/sessions-template.md`.
5. Validate the instance shape.

## Required Shape

```text
learn/<instance>/
  profile.md
  curriculum.md
  sessions.md
```

## Validation

- `profile.md` includes goal, scope, schedule, learning approach, and progress tracking.
- `curriculum.md` uses stable lesson IDs and the required lesson fields.
- `sessions.md` is append-only and references the active curriculum.
- No framework files are copied into the instance except as adapted content.
