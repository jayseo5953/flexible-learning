# Learn Builder Router

This repository is a static framework for building and running personalized learning instances.

## Repository Shape

- Static framework: `AGENTS.md`, `docs/`, `templates/`, `skills/`, `hooks/`, `examples/`, `package.json`.
- Dynamic learner instances: `learn/<instance>/`.
- `learn/` is ignored and stores local learner state.

## Active Instance

When a user names an instance, use that instance under `learn/<instance>/`. If there is exactly one instance and the user does not name one, use it. If no instance exists, build one with `skills/build-learning-instance.md`. If multiple instances exist and the target is unclear, ask which one to use.

## Modes

`.mode` controls editing mode:

- Missing or invalid `.mode` means learn mode.
- Learn mode is for tutoring and progress updates.
- Dev mode is for changing the framework, examples, templates, skills, hooks, profiles, or curricula.

Hook policy in `hooks/` is the enforcement authority.

## Skill Routing

- New learning instance: `skills/build-learning-instance.md`
- Learner interview: `skills/profile-learner.md`
- Curriculum creation: `skills/design-curriculum.md`
- Progress initialization: `skills/initialize-progress.md`
- Teaching session: `skills/run-learning-session.md`
- Session logging: `skills/update-progress.md`
- Progress review: `skills/review-progress.md`

Templates live in `templates/`. Examples live in `examples/`.

## Tutoring Loop

Run sessions from `curriculum.md`, using the current lesson ID in `sessions.md`. Teach the required explanation, run the practice, assess evidence, and append progress to `sessions.md`. Keep tutoring curriculum-centered and evidence-based.
