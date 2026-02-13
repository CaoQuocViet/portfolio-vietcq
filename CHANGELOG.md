## v0.2.4

- Added blog comment system — guest commenting with threaded replies, gravatar avatars, relative time display, and i18n (EN/VI).

- Server: `comments` collection with `created_at` autodate, auto-approved status, anonymous default name, and schema migration support.

- Client: `BlogComments`, `CommentForm`, `CommentItem` components with TanStack Query hooks (`use-blog-comments`) for data fetching and cache invalidation.

## v0.2.3

- Added palette switcher integrated into battery icon — 8 color palettes available (Dusty Denim, Coffee, Forest, Slate, Imperial Violet, Peach Glow, Azure Mist, Graphite).

- Migrated all component colors to CSS custom properties — dock, layout, blog, project, shared, UI, and page components now reference semantic design tokens instead of hardcoded Tailwind colors.


## v0.2.2

- Expanded CSS design system with complete token coverage — overlay, tooltip, badge, code blocks, skeleton, links, button variants (primary/secondary/ghost/danger/disabled), divider, shadow scales, focus ring, and scrollbar tokens for both light and dark modes.

- Added PocketBase fetch API client library for centralized backend communication.

- Replaced monolithic `useBlog` hook with modular TanStack Query hooks — `use-blog-posts`, `use-blog-post`, `use-blog-search`, `use-blog-stats`, `use-blog-tags`.

- Extracted shared blog card utilities (`formatPostDate`, `getPostImageUrl`, `formatReadTime`, `normalizePostTags`).

- Added `ErrorBoundary` component with retry action and accessible error UI.

- Added `PaletteSwitcher` component for runtime palette selection.

- Rebuilt blog UI with new components — `BlogCard`, `BlogCardHorizontal`, `BlogListFilters` _(search + category pills)_, `BlogListPagination` _(44px touch targets, aria-live)_, `BlogListLoadingState` _(skeleton shimmer)_, `BlogListErrorState`.

- Rewrote `BlogList` with stagger animations, gradient title, and empty state CTA.

- Rewrote `BlogPost` with scroll-based reading progress bar, Web Share API with clipboard fallback, and sticky top bar.

- Removed legacy admin auth components and API proxy routes — replaced by direct PocketBase authentication.

- Added Toaster _(sonner)_ and skip-to-content accessibility link to root layout.

- Added blog i18n strings for EN and VI locales.

- Added debounced dock hover to prevent jitter at edges.

- Added portfolio engine on server with collections, hooks, and API routes. Centralized CORS in main.go.

- Updated Dockerfile and docker-compose configuration.


## v0.2.1

- Added i18n infrastructure with EN/VI translations.

- Applied i18n to all 14 client components.

- Migrated data fetching to TanStack Query with caching strategies.


## v0.1.1

- Added blog engine core on PocketBase — collections (`posts`, `tags`, `comments`, `media`), lifecycle hooks, and cron scheduling for scheduled publishing.

- Added blog API routes — RSS, Atom, JSON feeds, sitemap.xml, full-text search, and stats endpoints.

- Integrated blog engine into PocketBase server entry point.


## v0.0.1

- Initial release of Portfolio Vietcq.

- macOS-inspired dock navigation with hover magnification effects.

- Hero section with lazy-loaded 3D PC model _(React Three Fiber + Intersection Observer)_.

- About, Services, Projects, Contact, and Footer sections with framer-motion animations.

- Dynamic gallery system with auto-scrolling and project cards.

- Project detail pages with overview, features, and image galleries.

- Blog system with markdown rendering _(react-markdown + rehype-highlight)_.

- Admin dashboard with blog editor.

- Ideas showcase page.

- Dark/light theme via next-themes with system detection.

- Responsive design for mobile, tablet, and desktop.

- Docker deployment setup _(client port 5678, server port 8090)_.
