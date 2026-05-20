import { ref, computed } from 'vue'

const BASE_URL = 'https://api.oluwasetemi.dev'

/**
 * Composable for fetching a paginated list of posts
 * GET /posts — supports page, limit, search, sort, status
 */
export function usePosts() {
  const posts = ref([])
  const meta = ref(null)
  const loading = ref(false)
  const error = ref(null)

  async function fetchPosts({ page = 1, limit = 9, search = '', sort = 'DESC' } = {}) {
    loading.value = true
    error.value = null

    try {
      const params = new URLSearchParams({ page, limit, sort })
      if (search) params.set('search', search)

      const res = await fetch(`${BASE_URL}/posts?${params}`)
      if (!res.ok) throw new Error(`Server error: ${res.status} ${res.statusText}`)

      const json = await res.json()

      // API returns { data: [...], meta: {...} }
      if (Array.isArray(json)) {
        posts.value = json
        meta.value = null
      } else {
        posts.value = json.data ?? []
        meta.value = json.meta ?? null
      }
    } catch (err) {
      error.value = err.message || 'Failed to load posts. Please try again.'
      posts.value = []
    } finally {
      loading.value = false
    }
  }

  return { posts, meta, loading, error, fetchPosts }
}

/**
 * Composable for fetching a single post by ID or slug
 * GET /posts/{id} — accepts UUID or slug
 */
export function usePost() {
  const post = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const notFound = ref(false)

  async function fetchPost(idOrSlug) {
    loading.value = true
    error.value = null
    notFound.value = false
    post.value = null

    try {
      const res = await fetch(`${BASE_URL}/posts/${encodeURIComponent(idOrSlug)}`)

      if (res.status === 404) {
        notFound.value = true
        throw new Error('Post not found.')
      }
      if (!res.ok) throw new Error(`Server error: ${res.status} ${res.statusText}`)

      post.value = await res.json()
    } catch (err) {
      error.value = err.message || 'Failed to load post.'
    } finally {
      loading.value = false
    }
  }

  return { post, loading, error, notFound, fetchPost }
}
