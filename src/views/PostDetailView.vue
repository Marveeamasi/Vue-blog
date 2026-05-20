<template>
  <main class="post-detail">
    <div class="container post-detail__container">

      <!-- Back button -->
      <div class="post-detail__back">
        <button class="btn btn--ghost" @click="goBack">← Back</button>
        <RouterLink to="/" class="btn btn--ghost">Home</RouterLink>
      </div>

      <!-- Loading skeleton -->
      <div v-if="loading" class="post-detail__skeleton">
        <div class="skeleton skeleton--line skeleton--short" style="margin-bottom:1.5rem"></div>
        <div class="skeleton skeleton--title"></div>
        <div class="skeleton skeleton--line skeleton--medium" style="margin-bottom:2rem"></div>
        <div class="skeleton skeleton--image skeleton--tall"></div>
        <div style="margin-top:2rem">
          <div v-for="n in 6" :key="n" class="skeleton skeleton--line skeleton--full" style="margin-bottom:0.75rem"></div>
        </div>
      </div>

      <!-- Not found -->
      <div v-else-if="notFound" class="feedback-state feedback-state--error">
        <p class="feedback-state__icon">🔍</p>
        <h2 class="feedback-state__title">Post Not Found</h2>
        <p class="feedback-state__message">
          The post you're looking for doesn't exist or has been removed.
        </p>
        <RouterLink to="/" class="btn btn--primary">← Back to Home</RouterLink>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="feedback-state feedback-state--error">
        <p class="feedback-state__icon">⚠️</p>
        <p class="feedback-state__message">{{ error }}</p>
        <button class="btn btn--primary" @click="load">Retry</button>
      </div>

      <!-- Post content -->
      <article v-else-if="post" class="post-article">
        <!-- Category & Status badges -->
        <div class="post-article__badges">
          <span v-if="post.category" class="badge badge--category">{{ post.category }}</span>
          <span v-if="post.status === 'DRAFT'" class="badge badge--draft">Draft</span>
          <span v-if="post.status === 'ARCHIVED'" class="badge badge--archived">Archived</span>
        </div>

        <!-- Title -->
        <h1 class="post-article__title">{{ post.title }}</h1>

        <!-- Meta row -->
        <div class="post-article__meta">
          <span v-if="post.author">by <strong>{{ post.author }}</strong></span>
          <span class="post-article__dot" v-if="post.author">·</span>
          <time v-if="post.publishedAt || post.createdAt" :datetime="post.publishedAt || post.createdAt">
            {{ formatDate(post.publishedAt || post.createdAt) }}
          </time>
          <span class="post-article__dot">·</span>
          <span>{{ readingTime }} min read</span>
          <span v-if="post.viewCount" class="post-article__dot">·</span>
          <span v-if="post.viewCount">{{ post.viewCount }} views</span>
        </div>

        <!-- Tags -->
        <div v-if="post.tags" class="post-article__tags">
          <span
            v-for="tag in parsedTags"
            :key="tag"
            class="tag"
          >{{ tag }}</span>
        </div>

        <!-- Featured Image -->
        <div v-if="post.featuredImage" class="post-article__image-wrap">
          <img
            :src="post.featuredImage"
            :alt="post.title"
            class="post-article__image"
          />
        </div>

        <!-- Excerpt -->
        <p v-if="post.excerpt" class="post-article__excerpt">{{ post.excerpt }}</p>

        <!-- Full Content (rendered as HTML if it contains tags, else as plain text) -->
        <div class="post-article__content" v-html="renderedContent"></div>
      </article>

    </div>
  </main>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { usePost } from '../composables/usePosts.js'

const route = useRoute()
const router = useRouter()
const { post, loading, error, notFound, fetchPost } = usePost()

function load() {
  fetchPost(route.params.id)
}

function goBack() {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}

const readingTime = computed(() => {
  if (!post.value?.content) return 1
  const words = post.value.content.replace(/<[^>]*>/g, '').split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
})

const parsedTags = computed(() => {
  if (!post.value?.tags) return []
  return post.value.tags.split(',').map(t => t.trim()).filter(Boolean)
})

const renderedContent = computed(() => {
  if (!post.value?.content) return ''
  // If content appears to be plain text (no HTML tags), wrap paragraphs
  if (!/<[a-z][\s\S]*>/i.test(post.value.content)) {
    return post.value.content
      .split('\n\n')
      .map(p => `<p>${p.replace(/\n/g, '<br/>')}</p>`)
      .join('')
  }
  return post.value.content
})

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

onMounted(load)
</script>
