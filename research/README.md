# Research workspace for _The Measure_

This directory is for spoiler-controlled research before drafting essays.

## Spoiler protocol

- `reading-dossier.md` is the working, reader-position-aware guide.
- `source-map.md` lists useful sources and how risky they are.
- `spoiler-ledger.md` can hold whole-book or beyond-current-point findings, but anything there must be checked before it reaches an essay.
- Final essays should only use claims that are either within the declared reading scope or framed as non-spoiler context.

Current declared reading scope: **from “Spring” through Chapter 10**.

## Tooling

Run the disposable scraper from the repo root:

```sh
bun run research/tools/scrape-the-measure.mjs
```

It writes search-result metadata and compact page snapshots to `research/sources/`. It intentionally stores titles, descriptions, headings, and links rather than full articles or book text.
