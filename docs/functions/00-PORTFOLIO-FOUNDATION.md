# 00 — Portfolio Foundation

> Initial release (v0.0.1). macOS-inspired personal portfolio with static content.

## Goal

Create a polished personal portfolio website with a macOS desktop aesthetic — featuring a dock navigation, 3D model hero, project gallery, and basic blog — all served as a Next.js static site with static JSON data.

## Implementation Status

### Core UI — Complete
- [x] macOS-style Dock with magnification effect
- [x] Hero section with 3D portable PC model (React Three Fiber)
- [x] About section with interactive PC model
- [x] Services section
- [x] Contact section with social links
- [x] Footer
- [x] Dark/light theme toggle (next-themes)
- [x] Responsive layout

### Gallery & Projects — Complete
- [x] Project cards with category filtering
- [x] Project detail pages (`/project/[id]`)
- [x] Static JSON data in `public/data/`
- [x] TrongDong background effect

### Blog (Static) — Complete
- [x] Blog list page with markdown rendering
- [x] Blog post detail with react-markdown + rehype-highlight
- [x] Static blog content from JSON

### Infrastructure — Complete
- [x] Next.js 15 with App Router
- [x] Tailwind CSS for styling
- [x] Framer Motion animations
- [x] i18n support (EN/VI) via LanguageContext
- [x] Docker deployment (client port 5678)
- [x] PocketBase server scaffolding (port 8090)

## Known Issues

- All project/blog data is static JSON — no CMS
- No search functionality
- No comment system
- 3D model load time on slow connections

## Next Steps

Superseded by [01-BLOG.md](./01-BLOG.md) and [02-PROJECT.md](./02-PROJECT.md).
