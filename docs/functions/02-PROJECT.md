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

### Frontend (Client) — Complete

- [x] `lib/pocketbase.js` — `listProjects(lang)`, `getProject(slug, lang)` functions
- [x] `hooks/use-projects.js` — TanStack Query hooks: `useProjects(lang)`, `useProject(slug, lang)`
- [x] `components/share/ProjectsList.jsx` — uses `useProjects` hook instead of static JSON
- [x] `components/project/index.jsx` — uses `useProject` hook for detail page
- [x] Bilingual support via `lang` param (tied to i18n context)
- [x] Static JSON files kept in `public/data/project-detail/` as reference

#### Gallery Migration — Complete
- [x] Migrated 107 project gallery images from filesystem (`client/public/data/project-demo/`) to PocketBase `project_images` collection
- [x] Gallery component updated to use PocketBase image URLs with thumbnail parameters
- [x] Image URLs now served via `/api/files/project_images/{recordId}/{filename}?thumb=400x300` (cached)
- [x] Display order preserved via `display_order` field in project_images schema
- [x] Alt text and captions stored in collection (previously missing from filesystem)

#### Client Files
```
client/src/
├── lib/pocketbase.js                     # listProjects, getProject, getProjectImages
├── hooks/use-projects.js                 # useProjects, useProject
├── hooks/use-gallery.js                  # useGallery (migrated to PocketBase)
├── components/share/ProjectsList.jsx
├── components/project/index.jsx
├── components/gallery/GalleryGrid.jsx
└── components/gallery/GalleryImageCard.jsx
```

## Known Issues

- `slugify()` duplicated with blog engine — should extract to shared package
- Image URLs use collection ID (`pbc_xxx`) — correct but not human-readable
- No Go unit tests for portfolio hooks/routes
- Legacy `/api/projects` route still exists (unused, can be removed)

## Next Steps

### Short-term
1. Remove legacy `/api/projects` API route
2. Add Go unit tests for portfolio hooks/routes
3. Extract `slugify()` to shared package
4. Optimize image loading (lazy loading, responsive sizes)

### Future Enhancements

#### User Engagement
- [ ] Project comments/feedback — use existing `comments` collection or create project-specific comments
  - Allow users to leave feedback, questions on projects
  - Threaded replies with gravatar avatars
  - Admin moderation panel

#### Analytics & Insights
- [ ] Project view counts — add `view_count` (number) field, increment on `/api/portfolio/projects/{slug}` GET
- [ ] Project download counts — track project demo/code downloads (if applicable)
- [ ] Analytics dashboard — charts showing most-viewed projects, trending technologies

#### Content Organization
- [ ] Project search/filter on gallery page — full-text search by name, description, technologies
  - Add `/api/portfolio/projects/search?q=` custom route
  - Filter pills for technology stack (React, Go, TypeScript, etc.)
- [ ] Technology browser — dedicated page showing all projects by tech stack with counts
- [ ] Project timeline visualization — chronological view of projects by start_date/end_date

#### Related Content
- [ ] Related projects suggestions — algorithm to suggest similar projects based on technologies/category
  - Show "You might also like" cards at bottom of project detail
  - Improve user discovery across portfolio

#### Media Enhancements
- [ ] Responsive image optimization — serve different sizes based on viewport (currently uses fixed thumbs)
- [ ] Video support — embed project demo videos (YouTube, Vimeo, or self-hosted MP4)
- [ ] 3D project showcases — integrate with Three.js for interactive project visualization
