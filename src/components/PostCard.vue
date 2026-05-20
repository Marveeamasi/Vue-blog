<template>
  <article class="post-card">
    <!-- Featured Image: only rendered when non-null and not broken -->
    <div v-if="showImage" class="post-card__image-wrap">
      <img
        :src="post.featuredImage"
        :alt="post.title"
        class="post-card__image"
        loading="lazy"
        @error="imageError = true"
      />
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

// Only show image if featuredImage is a non-empty string and hasn't errored
const showImage = computed(() => {
  return !imageError.value &&
    typeof props.post.featuredImage === 'string' &&
    props.post.featuredImage.trim() !== ''
})

const excerpt = computed(() => {
  if (props.post.excerpt) return props.post.excerpt
  if (!props.post.content) return ''
  const text = props.post.content.replace(/<[^>]*>/g, '')
  return text.length > 180 ? text.slice(0, 180).trim() + '…' : text
})

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  })
}
</script>
