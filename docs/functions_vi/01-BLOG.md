# 01 — Blog

> Hệ thống blog full-stack: PocketBase engine + Next.js client.

## Mục tiêu

Xây dựng hệ thống blog hoàn chỉnh với PocketBase backend (collections, hooks, feeds, search, scheduled publishing, comments) và Next.js frontend (TanStack Query data fetching, modular components, trải nghiệm đọc, admin editor) — hỗ trợ i18n, UI accessible và nhiều bảng màu.

## Hiện trạng triển khai

### Server: Collections — Hoàn thành
- [x] `posts` — title, slug, content (markdown), excerpt, status (draft/published/scheduled), visibility (public/private), published_at, tags (relation), cover_image, word_count, read_time
- [x] `tags` — name, slug, description, post_count (tự đồng bộ)
- [x] `comments` — post (relation), parent_id (threaded), author_name, author_email, content, status (approved/pending/spam), likes, created_at (autodate)
- [x] `media` — file, name, alt_text, type, size

### Server: Hooks — Hoàn thành
- [x] Tự tạo slug từ title (posts) và name (tags)
- [x] Thống kê văn bản: word_count + read_time (200 wpm)
- [x] Tự tạo excerpt (~160 ký tự) nếu trống
- [x] Đồng bộ post_count của tag khi tạo/sửa/xóa bài viết (SQL-based)
- [x] Xử lý ngày scheduled → published
- [x] Kiểm tra slug trùng lặp
- [x] Mặc định tên tác giả bình luận = "Anonymous", mặc định status = "approved"

### Server: SEO Routes — Hoàn thành
- [x] `/feed.xml` — RSS 2.0 (cache 10 phút)
- [x] `/feed.atom` — Atom feed (cache 10 phút)
- [x] `/sitemap.xml` — XML sitemap (cache 1 giờ)
- [x] `/robots.txt` — Chặn bot (GPTBot, CCBot, v.v.)

### Server: API Routes — Hoàn thành
- [x] `/api/blog/search?q=` — Tìm kiếm toàn văn với phân trang
- [x] `/api/blog/stats` — Thống kê theo năm (cache 1 giờ, SQL aggregation)

### Server: Cron — Hoàn thành
- [x] Xuất bản bài viết đã lên lịch (mỗi phút)
- [x] Đồng bộ số lượng bài của tag (mỗi giờ)

### Server: Cache — Hoàn thành
- [x] In-memory TTL cache cho feeds, sitemap, stats
- [x] Tự xóa cache khi CRUD bài viết

### Client: API & Data Layer — Hoàn thành
- [x] `lib/pocketbase.js` — Fetch-based client (listPosts, getPost, searchPosts, getStats, listTags, listComments, createComment, getFileUrl)
- [x] TanStack Query hooks: `use-blog-comments` — list + create + reply với cache invalidation
- [x] `contexts/AuthContext.jsx` — Auth state với localStorage persistence
- [x] TanStack Query hooks: `use-blog-posts`, `use-blog-post`, `use-blog-search`, `use-blog-tags`, `use-blog-stats`, `use-blog-mutations`

### Client: Danh sách Blog — Hoàn thành
- [x] `BlogCard.jsx` — Card dọc với ảnh, metadata, hover animation
- [x] `BlogCardHorizontal.jsx` — Layout ngang cho bài nổi bật
- [x] `BlogListFilters.jsx` — Tìm kiếm + category pills
- [x] `BlogListPagination.jsx` — Nav accessible (44px touch targets, aria-live)
- [x] `BlogListLoadingState.jsx` — Skeleton shimmer cards
- [x] `BlogListErrorState.jsx` — Lỗi với nút thử lại
- [x] `blog-card-utils.js` — Shared formatters
- [x] `BlogList.jsx` — Composition modular, stagger animations, empty state

### Client: Bài viết Blog — Hoàn thành
- [x] Thanh tiến trình đọc (scroll-based)
- [x] Nút chia sẻ (Web Share API / clipboard fallback)
- [x] Top bar cố định, semantic time elements

### Client: Admin & Editor — Hoàn thành
- [x] Xác thực trực tiếp PocketBase (đã xóa legacy proxy routes)
- [x] `BlogEditor.jsx` với sonner toast notifications

### Client: Hệ thống bình luận — Đang triển khai
- [x] Bình luận khách với threaded replies
- [x] Gravatar avatars, hiển thị thời gian tương đối
- [x] Hỗ trợ i18n (EN/VI)
- [ ] UI quản trị bình luận (approve/spam toggle)
- [ ] Thông báo email khi có reply
- [ ] Chức năng like

### Client: UI/UX — Hoàn thành
- [x] ErrorBoundary với retry
- [x] Link skip-to-content
- [x] Focus-visible, ARIA labels, reduced-motion
- [x] CSS design tokens (8 bảng màu, light/dark)

### File Server
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

### File Client
```
client/src/
├── lib/pocketbase.js
├── hooks/use-blog-*.js (7 hooks)
├── components/blog/ (11 components + utils)
└── contexts/AuthContext.jsx
```

## Vấn đề đã biết

- `slugify()` trùng lặp giữa blog và portfolio engines — cần tách ra shared package
- Slug trùng trả về lỗi 400 chung (giới hạn PocketBase hook)
- `Config.CORSOrigins` không sử dụng vì CORS đã tập trung — cần xóa
- Chưa có Go unit tests cho blog hooks/routes

## Bước tiếp theo

### Ngắn hạn
- [ ] UI quản trị bình luận (approve/spam toggle)
- [ ] Thông báo email khi có bình luận/reply
- [ ] Integration testing với PocketBase đang chạy
- [ ] Tách `slugify()` ra `server/shared/`
- [ ] Thêm Go unit tests cho hooks và routes
- [ ] Xóa `CORSOrigins` không sử dụng trong blog config

### Cải tiến tương lai (Hoãn lại)
- [ ] Collection `reactions` — emoji reactions với atomic increment qua custom route, rate-limited theo IP
- [ ] Collection `blog_settings` — cấu hình có thể chỉnh sửa runtime (hiện hardcoded trong env vars)
- [ ] `/feed.json` — JSON Feed 1.1 format
- [ ] `/s/{shortId}` — Short URL redirect tới `/blog/{slug}`
- [ ] FTS5 full-text search — thay thế `LIKE` search hiện tại bằng SQLite FTS5 virtual table cho relevance ranking, stemming, phrase matching
- [ ] Image compression hook — resize ảnh upload qua Go `imaging` library trên `OnRecordCreate("media")`
- [ ] Feed HTML rendering — render markdown sang HTML trong feed content (hiện phục vụ raw markdown)
- [ ] Markdown editor split preview — live preview pane trong BlogEditor
- [ ] Media browser — drag-drop inline image upload, chọn từ media library hiện có
- [ ] Stale draft cleanup cron — xóa bản nháp cũ hơn 90 ngày mỗi tuần
- [ ] PocketBase realtime subscriptions — cập nhật bài viết trực tiếp qua WebSocket
