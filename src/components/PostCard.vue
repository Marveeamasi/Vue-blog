<template>
  <article class="post-card">
    <!-- Featured Image -->
    <div class="post-card__image-wrap">
      <img
        v-if="post.featuredImage"
        :src="post.featuredImage"
        :alt="post.title"
        class="post-card__image"
        loading="lazy"
        @error="imageError = true"
      />
      <div v-else class="post-card__image-placeholder">
        <span class="post-card__placeholder-icon">✦</span>
      </div>
    </div>

    <div class="post-card__body">
      <!-- Meta -->
      <div class="post-card__meta">
        <span v-if="post.category" class="post-card__category">{{ post.category }}</span>
        <span class="post-card__date">{{ formatDate(post.publishedAt || post.createdAt) }}</span>
      </div>

      <!-- Title -->
      <h2 class="post-card__title">
        <RouterLink :to="`/posts/${post.id}`" class="post-card__title-link">
          {{ post.title }}
        </RouterLink>
      </h2>

      <!-- Excerpt -->
      <p class="post-card__excerpt">{{ excerpt }}</p>

      <!-- Footer -->
      <div class="post-card__footer">
        <span v-if="post.author" class="post-card__author">by {{ post.author }}</span>
        <RouterLink :to="`/posts/${post.id}`" class="post-card__read-more">
          Read more →
        </RouterLink>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

const imageError = ref(false)

const excerpt = computed(() => {
  if (props.post.excerpt) return props.post.excerpt
  // Strip HTML tags and truncate
  const text = props.post.content.replace(/<[^>]*>/g, '')
  return text.length > 180 ? text.slice(0, 180).trim() + '…' : text
})

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>
