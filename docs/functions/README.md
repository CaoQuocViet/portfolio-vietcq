# Feature Specifications

Goals, implementation status, and next steps for each major feature.

## Feature Index

| # | Feature | Status | File |
|---|---------|--------|------|
| 00 | Portfolio Foundation | Complete (v0.0.1) | [00-PORTFOLIO-FOUNDATION.md](./00-PORTFOLIO-FOUNDATION.md) |
| 01 | Blog | In Progress (comments) | [01-BLOG.md](./01-BLOG.md) |
| 02 | Portfolio Engine | BE Complete, FE Pending | [02-PROJECT.md](./02-PROJECT.md) |

## Architecture

```
server/
├── examples/base/main.go    # CORS, blog.Register(), portfolio.Register()
├── blog/                     # Blog engine (~600 LOC)
└── portfolio/                # Portfolio engine (~730 LOC)

client/
├── src/lib/pocketbase.js     # PocketBase fetch client
├── src/hooks/use-blog-*.js   # TanStack Query hooks
├── src/components/blog/      # Modular blog UI
└── global.css                # Design tokens (8 palettes)
```

**Shared server pattern:** `Register(app, cfg)` → hooks → bootstrap → serve. CORS centralized in main.go.
