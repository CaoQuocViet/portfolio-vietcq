# 03 — Social Links

> Dynamic social link management via PocketBase collection + admin toggle.

## Goal

Replace hardcoded social links with a PocketBase-managed `social_links` collection, enabling runtime add/remove/reorder/toggle visibility from the admin dashboard — without redeploying the client.

## Current State

Social links are hardcoded in three locations:

1. **`client/src/utils/info.js`** — `info.social` object with URLs for GitHub, LinkedIn, Twitter, YouTube, Discord, Facebook, Daily.dev, Website
2. **`client/src/data/socialPlatforms.js`** — `SOCIAL_PLATFORMS` array with label, URL (from `info.social`), inline SVG icon, and Tailwind color classes
3. **`client/src/components/layout/Footer.jsx`** — Separate hardcoded array with `react-icons` (FaGithub, FaLinkedin, FaXTwitter)
4. **`client/src/components/layout/hero/Hero.jsx`** — Same hardcoded array (FaGithub, FaLinkedin, FaXTwitter)

Consumers of `SOCIAL_PLATFORMS`:
- `client/src/components/layout/Contact.jsx` — Orbital layout with all 8 platforms
- `client/src/components/share/SocialList.jsx` — Generic social list component

## Proposed Server Collection

### `social_links` collection schema

| Field | Type | Details |
|-------|------|---------|
| `platform` | text (required, max 50) | Platform name (e.g. "GitHub") |
| `url` | url (required) | Profile URL |
| `icon_name` | text (required, max 50) | Icon identifier (e.g. "github", "linkedin") |
| `display_order` | number (default 0) | Sort priority (ascending) |
| `is_active` | bool (default true) | Toggle visibility |
| `color` | text (max 100) | Tailwind gradient classes |

Access rules:
- List/View: public (no auth required)
- Create/Update/Delete: admin only

### Bootstrap

Auto-create collection on server bootstrap with seed data matching current 8 platforms.

## Proposed API Route

`GET /api/portfolio/social` — Returns active social links sorted by `display_order`.

Response:
```json
{
  "items": [
    {
      "id": "...",
      "platform": "GitHub",
      "url": "https://github.com/caoquocviet",
      "icon_name": "github",
      "display_order": 1,
      "is_active": true,
      "color": "bg-gradient-to-br from-gray-800 to-gray-900 text-white border-gray-700"
    }
  ]
}
```

Filter: `is_active = true`, Sort: `display_order ASC`.

Cache: 10-minute in-memory TTL, invalidated on social_links CRUD.

## Client Integration Plan

1. Add `listSocialLinks()` to `lib/pocketbase.js`
2. Create `hooks/use-social-links.js` with TanStack Query hook `useSocialLinks()`
3. Create icon mapping: `icon_name` string → React component (SVG or react-icons)
4. Update `Contact.jsx`, `SocialList.jsx`, `Footer.jsx`, `Hero.jsx` to use hook instead of hardcoded data
5. Remove `SOCIAL_PLATFORMS` from `data/socialPlatforms.js` and `info.social` from `utils/info.js`
6. Add admin UI toggle for `is_active` in admin dashboard

## Implementation Status

### Server
- [ ] `social_links` collection schema in `server/portfolio/collections.go`
- [ ] Bootstrap seed data (8 platforms)
- [ ] `GET /api/portfolio/social` route in `server/portfolio/routes-api.go`
- [ ] Cache with TTL + CRUD invalidation

### Client
- [ ] `listSocialLinks()` in `lib/pocketbase.js`
- [ ] `hooks/use-social-links.js` — `useSocialLinks()` hook
- [ ] Icon mapping utility (`icon_name` → component)
- [ ] Update `Contact.jsx` to use dynamic data
- [ ] Update `SocialList.jsx` to use dynamic data
- [ ] Update `Footer.jsx` to use dynamic data
- [ ] Update `Hero.jsx` to use dynamic data
- [ ] Remove hardcoded `SOCIAL_PLATFORMS` and `info.social`
- [ ] Admin toggle UI for `is_active`

## File List

### Server (new/modified)
```
server/portfolio/collections.go   # Add social_links collection + seed
server/portfolio/routes-api.go    # Add GET /api/portfolio/social
```

### Client (new/modified)
```
client/src/lib/pocketbase.js                  # Add listSocialLinks()
client/src/hooks/use-social-links.js          # New hook
client/src/components/shared/icon-map.js      # New: icon_name → component
client/src/components/layout/Contact.jsx      # Use useSocialLinks()
client/src/components/share/SocialList.jsx    # Use useSocialLinks()
client/src/components/layout/Footer.jsx       # Use useSocialLinks()
client/src/components/layout/hero/Hero.jsx    # Use useSocialLinks()
client/src/data/socialPlatforms.js            # Remove (after migration)
client/src/utils/info.js                      # Remove social object
```
