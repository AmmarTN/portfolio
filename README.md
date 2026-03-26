# Astro Portfolio - README v2

A modern personal portfolio built with Astro, Tailwind CSS, and React components.

## Overview

This project is a fast, static-first portfolio with:
- Astro pages and layouts
- Reusable Astro components for sections like home, projects, and contact
- React islands for interactive UI elements
- Tailwind CSS for styling
- TypeScript across Astro and React

## Tech Stack

- Astro 5
- TypeScript
- Tailwind CSS
- React 19
- Firebase (configured in project dependencies)

## Project Structure

```text
.
├── public/
│   ├── fonts/
│   ├── media/
│   │   └── projects/
│   ├── png/
│   │   └── projects/
│   └── svg/
├── src/
│   ├── components/
│   ├── data/
│   ├── layouts/
│   ├── pages/
│   │   └── projects/
│   └── React/
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

## Requirements

- Node.js 18+
- npm or pnpm

## Local Development

1. Install dependencies:

```bash
pnpm install
```

If you use npm:

```bash
npm install
```

2. Start the dev server:

```bash
pnpm dev
```

3. Open the app:

```text
http://localhost:4321
```

## Available Scripts

- `pnpm dev` - Start local development server
- `pnpm build` - Run Astro checks and create production build
- `pnpm preview` - Preview production build locally
- `pnpm astro` - Run Astro CLI commands

## Build for Production

```bash
pnpm build
pnpm preview
```

## Customization Guide

- Main page content: edit files in `src/components/` and `src/data/`
- Portfolio projects list: update `src/data/projects.json` and `src/data/projects.ts`
- Dynamic project route: `src/pages/projects/[slug].astro`
- Global layout: `src/layouts/Layout.astro`
- Interactive React pieces: `src/React/`
- Static assets: `public/`

## Notes

- The project includes Docker and Nginx configuration files (`Dockerfile`, `docker-compose.yml`, `nginx.container.conf`) for deployment workflows.
- A Firebase setup file exists at `src/firebase.ts`.

## License

This project is licensed under the MIT License. See `LICENSE` for details.
