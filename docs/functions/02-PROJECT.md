# 02 — Portfolio Engine

> PocketBase-based project management. Backend complete, frontend integration pending.

## Goal

Migrate project data from static JSON files to PocketBase collections with bilingual support (EN/VI), image management, and a REST API — then connect the client to consume this API instead of static files.

## Implementation Status

### Backend (Server) — Complete

#### Collections (auto-created on bootstrap)
- [x] `projects` — name, slug, content_en (JSON), content_vi (JSON), technologies (JSON), status, visibility, featured, priority, color, links (JSON), start_date, end_date
- [x] `project_images` — project (relation, cascade delete), image (file 5MB, jpeg/png/webp), alt_text, caption, display_order

#### Hooks
- [x] Auto-slug from project name on create
- [x] Slug uniqueness validation
- [x] Auto display_order (max+1) for new images

#### API Routes
- [x] `GET /api/portfolio/projects` — List with pagination, filters (featured, status), SQL COUNT, ?lang=vi/en
- [x] `GET /api/portfolio/projects/{slug}` — Detail with project_images joined, ?lang=vi/en

#### Data Migration CLI
- [x] `./pb migrate-projects --data-path=... --images-path=... --dry-run`
- [x] Successfully imported 10 projects + 100+ images
- [x] Schema migration: removed 4 unused fields (github_url, live_url, demo_url, project_type)

#### Server Files
```
server/portfolio/
├── config.go         # Config + Register() entry point
├── collections.go    # 2 collections schema + bootstrap + migration
├── hooks.go          # auto-slug, uniqueness, image ordering
├── routes.go         # OnServe orchestrator
├── routes-api.go     # list + detail endpoints
└── migrate.go        # CLI migration tool
```

### Frontend (Client) — Not Started

The client still reads project data from static JSON files in `public/data/project-detail/`. It needs to be refactored to consume the PocketBase API.

#### What needs to happen:
- [ ] Create `client/src/lib/portfolio.js` — API client for portfolio endpoints
- [ ] Create TanStack Query hooks: `use-projects.js`, `use-project.js`
- [ ] Refactor `client/src/app/api/projects/route.js` — proxy or remove in favor of direct PocketBase calls
- [ ] Update gallery components to fetch from API instead of static JSON
- [ ] Update project detail page to use API data
- [ ] Handle bilingual content switching (lang param tied to i18n context)
- [ ] Image URLs: use `getFileUrl()` from PocketBase client

## Known Issues

- `slugify()` duplicated with blog engine — should extract to shared package
- Image URLs use collection ID (`pbc_xxx`) — correct but not human-readable
- No Go unit tests for portfolio hooks/routes

## Next Steps

1. Create PocketBase API client for portfolio endpoints
2. Create TanStack Query hooks for projects
3. Refactor gallery/project pages to consume API
4. Wire bilingual switching to i18n context
5. Remove static JSON dependency
6. Add Go unit tests
