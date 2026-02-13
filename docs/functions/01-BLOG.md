# 01 — Blog

> Full-stack blog system: PocketBase engine + Next.js client.

## Goal

Build a complete blog system with PocketBase backend (collections, hooks, feeds, search, scheduled publishing, comments) and Next.js frontend (TanStack Query data fetching, modular components, reading experience, admin editor) — supporting i18n, accessible UI, and multiple color palettes.

## Implementation Status

### Server: Collections — Complete
- [x] `posts` — title, slug, content (markdown), excerpt, status (draft/published/scheduled), visibility (public/private), published_at, tags (relation), cover_image, word_count, read_time
- [x] `tags` — name, slug, description, post_count (auto-synced)
- [x] `comments` — post (relation), parent_id (threaded), author_name, author_email, content, status (approved/pending/spam), likes, created_at (autodate)
- [x] `media` — file, name, alt_text, type, size

### Server: Hooks — Complete
- [x] Auto-slug from title (posts) and name (tags)
- [x] Text metrics: word_count + read_time (200 wpm)
- [x] Auto-excerpt (~160 chars) if empty
- [x] Tag post_count sync on post create/update/delete (SQL-based)
- [x] Scheduled → published date handling
- [x] Slug uniqueness validation
- [x] Default comment author name = "Anonymous", default status = "approved"

### Server: SEO Routes — Complete
- [x] `/feed.xml` — RSS 2.0 (10min cache)
- [x] `/feed.atom` — Atom feed (10min cache)
- [x] `/sitemap.xml` — XML sitemap (1hr cache)
- [x] `/robots.txt` — Blocked bots (GPTBot, CCBot, etc.)

### Server: API Routes — Complete
- [x] `/api/blog/search?q=` — Full-text search with pagination
- [x] `/api/blog/stats` — Yearly stats (1hr cache, SQL aggregation)

### Server: Cron — Complete
- [x] Publish scheduled posts (every minute)
- [x] Sync tag counts (hourly)

### Server: Cache — Complete
- [x] In-memory TTL cache for feeds, sitemap, stats
- [x] Auto-invalidation on posts CRUD

### Client: API & Data Layer — Complete
- [x] `lib/pocketbase.js` — Fetch-based client (listPosts, getPost, searchPosts, getStats, listTags, listComments, createComment, getFileUrl)
- [x] TanStack Query hooks: `use-blog-comments` — list + create + reply with cache invalidation
- [x] `contexts/AuthContext.jsx` — Auth state with localStorage persistence
- [x] TanStack Query hooks: `use-blog-posts`, `use-blog-post`, `use-blog-search`, `use-blog-tags`, `use-blog-stats`, `use-blog-mutations`

### Client: Blog List — Complete
- [x] `BlogCard.jsx` — Vertical card with image, metadata, hover animation
- [x] `BlogCardHorizontal.jsx` — Horizontal layout for featured posts
- [x] `BlogListFilters.jsx` — Search + category pills
- [x] `BlogListPagination.jsx` — Accessible nav (44px touch targets, aria-live)
- [x] `BlogListLoadingState.jsx` — Skeleton shimmer cards
- [x] `BlogListErrorState.jsx` — Error with retry
- [x] `blog-card-utils.js` — Shared formatters
- [x] `BlogList.jsx` — Modular composition, stagger animations, empty state

### Client: Blog Post — Complete
- [x] Reading progress bar (scroll-based)
- [x] Share button (Web Share API / clipboard fallback)
- [x] Sticky top bar, semantic time elements

### Client: Admin & Editor — Complete
- [x] Direct PocketBase auth (removed legacy proxy routes)
- [x] `BlogEditor.jsx` with sonner toast notifications

### Client: Comment System — In Progress
- [x] Guest commenting with threaded replies
- [x] Gravatar avatars, relative time display
- [x] i18n support (EN/VI)
- [ ] Admin moderation UI (approve/spam toggle)
- [ ] Email notifications on replies
- [ ] Like functionality

### Client: UI/UX — Complete
- [x] ErrorBoundary with retry
- [x] Skip-to-content link
- [x] Focus-visible, ARIA labels, reduced-motion
- [x] CSS design tokens (8 palettes, light/dark)

### Server Files
```
server/blog/
├── config.go         # Config + Register()
├── collections.go    # 4 collections bootstrap
├── hooks.go          # 8 hooks
├── routes.go         # OnServe + cache invalidation
├── routes-seo.go     # RSS, Atom, sitemap, robots.txt
├── routes-api.go     # search, stats
└── cron.go           # scheduled publish + tag sync
```

### Client Files
```
client/src/
├── lib/pocketbase.js
├── hooks/use-blog-*.js (7 hooks)
├── components/blog/ (11 components + utils)
└── contexts/AuthContext.jsx
```

## Known Issues

- `slugify()` duplicated in blog and portfolio engines — extract to shared package
- Slug collision returns generic 400 (PocketBase hook limitation)
- `Config.CORSOrigins` unused since CORS centralized — remove
- No Go unit tests for blog hooks/routes

## Next Steps

### Short-term
- [ ] Comment admin moderation UI (approve/spam toggle)
- [ ] Email notifications on comments/replies
- [ ] Integration testing with running PocketBase
- [ ] Extract `slugify()` to `server/shared/`
- [ ] Add Go unit tests for hooks and routes
- [ ] Remove unused `CORSOrigins` from blog config

### Future Enhancements (Deferred)
- [ ] `reactions` collection — emoji reactions with atomic increment via custom route, rate-limited per IP
- [ ] `blog_settings` collection — runtime-editable config (currently hardcoded in env vars)
- [ ] `/feed.json` — JSON Feed 1.1 format
- [ ] `/s/{shortId}` — Short URL redirect to `/blog/{slug}`
- [ ] FTS5 full-text search — replace current `LIKE` search with SQLite FTS5 virtual table for relevance ranking, stemming, phrase matching
- [ ] Image compression hook — resize uploaded images via Go `imaging` library on `OnRecordCreate("media")`
- [ ] Feed HTML rendering — render markdown to HTML in feed content (currently serves raw markdown)
- [ ] Markdown editor split preview — live preview pane in BlogEditor
- [ ] Media browser — drag-drop inline image upload, select from existing media library
- [ ] Stale draft cleanup cron — weekly delete drafts older than 90 days
- [ ] PocketBase realtime subscriptions — live post updates via WebSocket
