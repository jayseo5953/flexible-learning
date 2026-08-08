# Versioning And Migrations

## Canonical Version

For v1, the canonical framework version is `package.json` `version`.

Future Git release tags should match package versions exactly, for example `v0.1.0` for package version `0.1.0`.

## Instance Metadata

Learning instances do not yet carry explicit framework metadata. A future version may add instance metadata such as:

- framework version used to create the instance
- instance creation date
- active curriculum version
- migration history

This is TODO and out of scope for v1.

## Migrations

Migration tooling is out of scope for v1. Until tooling exists, framework changes should preserve backward compatibility with existing `profile.md`, `curriculum.md`, and `sessions.md` files wherever practical.
