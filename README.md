# The Measure

Foldkit site for book-club essays about The Measure by Nikki Erlick.

The novel's premise is that every adult on earth receives a box containing a string that reveals the length of their life. This repo is the scaffold for a client-rendered reading companion: no database, no authentication.

## Stack

- Bun for scripts, development, static builds, and browser bundling.
- Foldkit for the frontend model, messages, update loop, typed HTML view, and client routing.
- Tailwind CSS v4 through the Tailwind CLI.
- Effect v4 beta with strict Effect diagnostics through `tsgo`.
- Hono for the local static dev server only; production deploys as static files.
- Vercel as the intended static deployment target.

## Getting Started

Install dependencies:

```sh
bun install
```

Initialize reference submodules:

```sh
bun references:update
```

Run the app:

```sh
bun dev
```

Open `http://localhost:3000`.

## Provenance Rules

Every future blog post should make authorship visible in two places:

- A post-level provenance summary at the beginning of the post.
- A section-level provenance label for each section.

AI post sections are rendered inside a hot pink boundary by design. The boundary is not decoration; it is part of the site's language for separating human work from human-reviewed AI work.

## Reference Repos And Skills

Reference repositories live under `reference_repositories/`:

- `effect-smol` for Effect usage patterns.
- `matt-pocock-skills` for skill ideas that can be adopted ad hoc.

Local adopted skills live under `.agents/skills/`, adapted for this book-site domain.

## Scripts

- `bun dev`: build CSS and browser JS, then serve `public/` locally with Bun hot reload.
- `bun run build`: emit generated assets in `public/assets/`.
- `bun check`: run Biome formatting/linting and `tsgo`.
- `bun typecheck`: run `tsgo` with strict TypeScript and Effect diagnostics.
- `bun references:update`: initialize or update git submodules under `reference_repositories/`.
- `bun chore:update`: update dependencies.

## Project Layout

- `src/frontend/index.ts`: browser entrypoint and Foldkit runtime setup.
- `src/frontend/app/`: Foldkit model, messages, commands, update, and route views.
- `src/frontend/services/`: browser Effect services, with one PascalCase folder per service.
- `src/frontend/posts/`: static post catalog. It starts empty on purpose.
- `src/frontend/components/`: local interactive section renderers for future posts.
- `src/shared/`: shared schemas and types for posts, sections, and provenance.
- `src/dev-server.ts`: local static server for development.
- `src/styles.css`: Tailwind v4 stylesheet entry.
- `reference_repositories/`: submodules used for upstream examples and agent-skill ideas.

The stable HTML shell lives in tracked `public/index.html`. Generated assets live in `public/assets/` and are ignored by git.

## Deployment

Vercel is configured for a static build with `outputDirectory: "public"` and a rewrite that keeps client-side routes working on refresh. See [docs/vercel-deployment.md](docs/vercel-deployment.md).

## Verification

Before handing off changes, run:

```sh
bun check
bun typecheck
bun run build
```
