---
name: Tailwind v4 setup
description: How Tailwind CSS v4 differs from v3 in PostCSS config, CSS directives, and arbitrary values in Next.js projects.
---

# Tailwind v4 Setup in Next.js

## The rule
Use `@import "tailwindcss"` + `@theme {}` in globals.css (NOT `@tailwind base/components/utilities`).
Use `@tailwindcss/postcss` (NOT `tailwindcss`) in postcss.config.mjs.
Add `@source` directives for all app/component/lib directories.

## Why
Tailwind v4 changed the plugin name and CSS directives. The v3 directives cause silent CSS failures.

## How to apply
- postcss.config.mjs: `plugins: { "@tailwindcss/postcss": {} }`
- globals.css starts with: `@import "tailwindcss";` then `@source "../components/**/*.{ts,tsx}";` etc.
- For arbitrary `aspect-[16/9]` values: use inline `style={{ aspectRatio: "16/9" }}` as a safe fallback — the bracket syntax may not always scan reliably.
- Custom design tokens go in `@theme {}` block in globals.css, not in tailwind.config.ts.
