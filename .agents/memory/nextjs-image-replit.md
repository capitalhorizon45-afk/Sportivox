---
name: Next.js image in Replit
description: External image loading constraints and workarounds when running Next.js inside Replit's sandbox.
---

# Next.js Image Loading in Replit

## The rule
Unsplash CDN images are blocked or return 404 inside Replit's sandbox network. Use `https://picsum.photos` for placeholder/mock images instead.

## Why
Replit's sandbox restricts certain CDN origins. Unsplash image optimization requests via `/_next/image?url=https://images.unsplash.com/...` fail with 404.

## How to apply
- Mock data: use `https://picsum.photos/seed/<name>/800/450` for stable placeholder images.
- Add `{ protocol: "https", hostname: "picsum.photos" }` to `next.config.ts` remotePatterns.
- For images sourced from external URLs (not next.js optimized): add `unoptimized` prop to `<Image>` component to bypass the optimizer.
- `next.config.ts` changes require a full workflow restart (not just hot-reload) to take effect.
- `allowedDevOrigins: ["*"]` required for Replit proxy iframe to function.
