# UI Testing Guide — Portfolio Blog Engine

## Services

| Service | URL | Purpose |
|---------|-----|---------|
| PocketBase Dashboard | http://localhost:8090/_/ | Admin CRUD for all collections |
| PocketBase API | http://localhost:8090/api/ | REST API |
| Next.js Client | http://localhost:3000 | Portfolio frontend |
| RSS Feed | http://localhost:8090/feed.xml | RSS 2.0 |
| Sitemap | http://localhost:8090/sitemap.xml | XML sitemap |
| robots.txt | http://localhost:8090/robots.txt | Bot rules |
| Search | http://localhost:8090/api/blog/search?q=term | Blog search |
| Stats | http://localhost:8090/api/blog/stats | Blog statistics |

## Start Services

```bash
# Backend (PocketBase blog engine)
cd backend && ./pb-blog serve --http=0.0.0.0:8090

# Frontend (optional — only needed for client testing)
cd client && pnpm dev
```

## Credentials

- **Email:** admin@vietcq.dev
- **Password:** Xk9#mP2$vL5nQ8rT

## Collections

| Collection | Fields | Access |
|------------|--------|--------|
| posts | title, slug, content, excerpt, status, visibility, published_at, category, author, tags, cover_image, images, word_count, read_time, char_count, parameters | Public: published+public; Admin: all |
| tags | name, slug, description, post_count | Public read; Admin write |
| comments | post, name, website, comment, original, approved | Public: approved only; Anyone can create; Admin: moderate |
| media | file, name, alt_text, type, size | Public read; Admin write |
| reactions | post, reaction, count | Public: published posts; Admin write |

## Test Scenarios

### 1. Dashboard Login
1. Open http://localhost:8090/_/
2. Login with admin credentials
3. Verify 5 collections: posts, tags, comments, media, reactions

### 2. Create Blog Post
1. Dashboard → posts → New Record
2. Fill: title, content (markdown), excerpt, status=published, visibility=public, category=technology
3. Save → verify auto-computed: slug, word_count, read_time, published_at

### 3. Tags
1. Dashboard → tags → New Record → name="golang"
2. Verify slug auto-generated: "golang"
3. Edit post → assign tag → save
4. Verify tag.post_count updated

### 4. Scheduled Post
1. Create post: status=scheduled, published_at=future datetime
2. Verify saves successfully
3. Try status=scheduled with past date → should fail validation
4. Wait 1 min for cron → verify status becomes "published"

### 5. Comments (Public API)
```bash
# Create comment (no auth)
curl -X POST http://localhost:8090/api/collections/comments/records \
  -H "Content-Type: application/json" \
  -d '{"post":"POST_ID","name":"Reader","comment":"Great post!"}'

# Verify: approved=false, not visible in public list
curl http://localhost:8090/api/collections/comments/records
# → empty (not approved)

# Admin approves in dashboard → now visible
```

### 6. Media Upload
1. Dashboard → media → New Record
2. Upload image, set name + type=image
3. Verify file at: /api/files/media/{id}/{filename}

### 7. RSS Feed
```bash
curl http://localhost:8090/feed.xml
# Verify: published posts in XML, URLs use BaseURL
```

### 8. Sitemap
```bash
curl http://localhost:8090/sitemap.xml
# Verify: posts + tags listed with correct URLs
```

### 9. Search
```bash
curl "http://localhost:8090/api/blog/search?q=golang&page=1&per_page=5"
# Verify: total_items, total_pages, paginated results
```

### 10. Access Rules
```bash
# Public sees only published+public
curl http://localhost:8090/api/collections/posts/records
# → only published+public posts

# Admin sees all (drafts included)
curl http://localhost:8090/api/collections/posts/records \
  -H "Authorization: Bearer $TOKEN"
# → all posts including drafts
```

### 11. Slug Uniqueness
1. Create post with title "Test"
2. Create another post with title "Test"
3. Second should fail: "slug 'test' is already taken"

## API Quick Reference

```bash
# Get auth token
TOKEN=$(curl -s -X POST http://localhost:8090/api/collections/_superusers/auth-with-password \
  -H "Content-Type: application/json" \
  -d '{"identity":"admin@vietcq.dev","password":"Xk9#mP2$vL5nQ8rT"}' | jq -r .token)

# Create post
curl -X POST http://localhost:8090/api/collections/posts/records \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Hello","content":"# Hello\nWorld","excerpt":"Test","status":"published","visibility":"public","category":"technology"}'

# Filter by slug
curl "http://localhost:8090/api/collections/posts/records?filter=slug='hello'"

# Expand relations
curl "http://localhost:8090/api/collections/posts/records?expand=tags,author"

# Stats
curl http://localhost:8090/api/blog/stats

# Search
curl "http://localhost:8090/api/blog/search?q=hello"
```
