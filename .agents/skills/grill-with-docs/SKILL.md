---
name: grill-with-docs
description: Grilling session for this The Measure book site that challenges a plan against the shared domain language, sharpens terminology in UBIQUITOUS_LANGUAGE.md, and records ADRs when decisions crystallize. Use when the user wants to stress-test a plan against this repo's language and documented decisions.
---

<what-to-do>

Interview me relentlessly about every aspect of this plan until we reach a shared understanding. Walk down each branch of the design tree, resolving dependencies between decisions one-by-one. For each question, provide your recommended answer.

Ask the questions one at a time, waiting for feedback on each question before continuing.

If a question can be answered by exploring the codebase, explore the codebase instead.

</what-to-do>

<supporting-info>

## Domain awareness

During codebase exploration, also look for existing documentation:

### File structure

This repo has one product context today. Its canonical language lives at the root:

```
/
|-- UBIQUITOUS_LANGUAGE.md
|-- AGENTS.md
|-- issues/
|   `-- README.md
|-- docs/
|   `-- adr/
|       |-- 0001-example-decision.md
|       `-- 0002-example-decision.md
|-- reference_repositories/
|   `-- ...
`-- src/
```

Check these first:

- `UBIQUITOUS_LANGUAGE.md` for domain terms, synonyms to avoid, relationships, and ambiguity flags.
- `docs/adr/` for architectural decisions, if it exists.
- `issues/README.md` and relevant `issues/**/*.md`, if tracked work exists.
- `reference_repositories/` for framework and package examples before inventing guidance.
- `AGENTS.md` for repo-specific collaboration rules.

Create files lazily - only when you have something to write. Do not create `issues/` just because you are grilling a plan. Create `docs/adr/` only when the first ADR is needed.

## During the session

### Challenge against the ubiquitous language

When the user uses a term that conflicts with `UBIQUITOUS_LANGUAGE.md`, call it out immediately. "Our language defines 'interactive section' as X, but you seem to mean Y - which is it?"

### Sharpen fuzzy language

When the user uses vague or overloaded terms, propose a precise canonical term. "You're saying 'component' - do you mean a Foldkit view helper, a Codex component inside a post, or a future package boundary? Those are different things."

This repo's language is for a public static reading companion for *The Measure*.

### Discuss concrete scenarios

When domain relationships are being discussed, stress-test them with specific scenarios. Invent scenarios that probe edge cases and force the user to be precise about the boundaries between concepts.

### Cross-reference with code

When the user states how something works, check whether the code agrees. If you find a contradiction, surface it: "Your post contract requires section-level provenance, but this renderer hides it - which is right?"

### Update UBIQUITOUS_LANGUAGE.md carefully

When a term is resolved, propose the exact change to `UBIQUITOUS_LANGUAGE.md` and ask for approval before editing it, unless the user has already explicitly authorized vocabulary updates during the current session. Use the format in [UBIQUITOUS-LANGUAGE-FORMAT.md](./UBIQUITOUS-LANGUAGE-FORMAT.md).

`UBIQUITOUS_LANGUAGE.md` should be devoid of implementation details. Do not treat it as a spec, a scratch pad, or a repository for implementation decisions. It is the shared domain vocabulary.

Collapse synonyms, flag ambiguous language, and call out overloaded terminology as soon as it appears.

### Offer ADRs sparingly

Only offer to create an ADR when all three are true:

1. **Hard to reverse** - the cost of changing your mind later is meaningful
2. **Surprising without context** - a future reader will wonder "why did they do it this way?"
3. **The result of a real trade-off** - there were genuine alternatives and you picked one for specific reasons

If any of the three is missing, skip the ADR. Use the format in [ADR-FORMAT.md](./ADR-FORMAT.md).

</supporting-info>
