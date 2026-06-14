# UBIQUITOUS_LANGUAGE.md Format

`UBIQUITOUS_LANGUAGE.md` lives at the repo root and is the canonical domain vocabulary for this The Measure book site.

## Structure

```md
# Ubiquitous Language

Shared vocabulary for the public static reading companion domain.

## Terms

- **Blog post**: A client-rendered essay about the book or book club discussion.
  - Avoid: article, page, entry

- **Interactive section**: A local client-side section that lets the reader manipulate state, inspect a scenario, or run a visualization.
  - Avoid: CodeSandbox, embed

## Relationships

- A blog post has many post sections.
- A post section has one provenance label.

## Flagged ambiguities

- **Component**: Ambiguous between a Foldkit view helper, a Codex-generated interactive section, and a future package boundary.
```

## Rules

- **Ask before editing.** Propose the exact vocabulary change and ask for approval before changing `UBIQUITOUS_LANGUAGE.md`, unless the user already explicitly approved vocabulary updates during the current session.
- **Be opinionated.** When multiple words exist for the same concept, pick the best one and list the others under `Avoid`.
- **Collapse synonyms.** Prefer one canonical term instead of preserving multiple names for the same concept.
- **Flag ambiguity.** If a term is overloaded, add it under `Flagged ambiguities` until the team resolves it.
- **Keep definitions tight.** One or two sentences max. Define what it IS, not what it does.
- **Only include domain terms.** General programming concepts, package names, API details, provider names, and utility patterns do not belong here.
- **Keep implementation out.** Deployment providers, package names, component filenames, and API details belong in code, issues, docs, or ADRs.
