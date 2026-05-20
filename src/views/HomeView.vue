<template>
  <main class="home">
    <!-- Hero -->
    <section class="hero">
      <div class="container">
        <h1 class="hero__title">Edy's Blog</h1>
        <p class="hero__subtitle">Thoughts, stories and ideas from the community</p>

        <!-- Search -->
        <form class="search-form" @submit.prevent="handleSearch">
          <div class="search-form__field">
            <svg class="search-form__icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              v-model="searchQuery"
              type="search"
              placeholder="Search posts…"
              class="search-form__input"
              aria-label="Search posts"
              @keyup.escape="clearSearch"
            />
            <button
              v-if="searchQuery"
              type="button"
              class="search-form__clear"
              aria-label="Clear search"
              @click="clearSearch"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <button type="submit" class="search-form__submit">
            Search
          </button>
        </form>
      </div>
    </section>

    <!-- Posts Grid -->
    <section class="posts-section container">
      <!-- Search result label -->
      <p v-if="activeSearch" class="posts-section__label">
        Results for "<strong>{{ activeSearch }}</strong>"
        <span v-if="meta"> — {{ meta.total }} post{{ meta.total === 1 ? '' : 's' }} found</span>
      </p>

      <!-- Loading skeletons -->
      <div v-if="loading" class="posts-grid">
        <SkeletonCard v-for="n in 9" :key="n" />
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="feedback-state feedback-state--error">
        <p class="feedback-state__icon">⚠️</p>
        <p class="feedback-state__message">{{ error }}</p>
        <button class="btn btn--primary" @click="load">Retry</button>
      </div>

      <!-- Empty state -->
      <div v-else-if="posts.length === 0" class="feedback-state">
        <p class="feedback-state__icon">📭</p>
        <p class="feedback-state__message">No posts found.</p>
        <button v-if="activeSearch" class="btn btn--ghost" @click="clearSearch">
          Clear search
        </button>
      </div>

      <!-- Post cards -->
      <div v-else class="posts-grid">
        <PostCard v-for="post in posts" :key="post.id" :post="post" />
      </div>

      <!-- Pagination -->
      <PaginationControls :meta="meta" @change="onPageChange" />
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import PostCard from '../components/PostCard.vue'
import SkeletonCard from '../components/SkeletonCard.vue'
import PaginationControls from '../components/PaginationControls.vue'
import { usePosts } from '../composables/usePosts.js'

const { posts, meta, loading, error, fetchPosts } = usePosts()

const searchQuery = ref('')
const activeSearch = ref('')
const currentPage = ref(1)

async function load() {
  await fetchPosts({ page: currentPage.value, search: activeSearch.value })
}

function handleSearch() {
  activeSearch.value = searchQuery.value.trim()
  currentPage.value = 1
  load()
}

function clearSearch() {
  searchQuery.value = ''
  activeSearch.value = ''
  currentPage.value = 1
  load()
}

function onPageChange(page) {
  currentPage.value = page
  load()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(load)
</script>
