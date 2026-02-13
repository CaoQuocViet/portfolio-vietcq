const BASE_URL = process.env.NEXT_PUBLIC_POCKETBASE_URL || 'http://localhost:8090'

function esc(val) {
  return String(val).replace(/'/g, "\\'")
}

function buildUrl(path, params = {}) {
  const url = new URL(path, BASE_URL)
  Object.entries(params).forEach(([key, val]) => {
    if (val !== undefined && val !== null && val !== '') {
      url.searchParams.set(key, String(val))
    }
  })
  return url.toString()
}

async function fetchApi(endpoint, { params, ...options } = {}) {
  const url = params ? buildUrl(endpoint, params) : buildUrl(endpoint)
  const res = await fetch(url, { ...options, headers: { 'Content-Type': 'application/json', ...options.headers } })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body?.message || `Request failed (${res.status})`)
  }

  if (res.status === 204) return null
  return res.json()
}

// --- Posts (read-only, public) ---

export function listPosts({ page = 1, perPage = 10, filter = '', sort = '-published_at' } = {}) {
  return fetchApi('/api/collections/posts/records', { params: { page, perPage, filter, sort } })
}

export function getPost(slug) {
  const filter = `slug='${esc(slug)}' && status='published' && visibility='public'`
  return fetchApi('/api/collections/posts/records', { params: { filter, perPage: 1 } })
    .then(res => res?.items?.[0] || null)
}

// --- Search & Stats ---

export function searchPosts(query, { page = 1, perPage = 10 } = {}) {
  return fetchApi('/api/blog/search', { params: { q: query, page, perPage } })
}

export function getStats() {
  return fetchApi('/api/blog/stats')
}

// --- Tags ---

export function listTags({ sort = '-post_count' } = {}) {
  return fetchApi('/api/collections/tags/records', { params: { sort, perPage: 100 } })
    .then(res => res?.items || [])
}

// --- Comments ---

export function listComments(postId, { sort = 'created_at' } = {}) {
  const filter = `post='${esc(postId)}' && status='approved'`
  return fetchApi('/api/collections/comments/records', { params: { filter, sort, perPage: 200 } })
    .then(res => res?.items || [])
}

export function createComment(data) {
  return fetchApi('/api/collections/comments/records', {
    method: 'POST',
    body: JSON.stringify({ ...data, status: 'approved' }),
  })
}

// --- Projects (portfolio) ---

export function listProjects({ lang = 'en' } = {}) {
  return fetchApi('/api/portfolio/projects', { params: { lang } })
}

export function getProject(slug, { lang = 'en' } = {}) {
  return fetchApi(`/api/portfolio/projects/${encodeURIComponent(slug)}`, { params: { lang } })
}

// --- Files ---

export function getFileUrl(collectionId, recordId, filename) {
  return `${BASE_URL}/api/files/${collectionId}/${recordId}/${filename}`
}
