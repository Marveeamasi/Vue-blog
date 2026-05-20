<template>
  <slot v-if="!hasError" />
  <div v-else class="error-boundary">
    <div class="error-boundary__icon">⚠️</div>
    <h2 class="error-boundary__title">Something went wrong</h2>
    <p class="error-boundary__message">{{ errorMessage }}</p>
    <div class="error-boundary__actions">
      <button class="btn btn--primary" @click="reset">Try Again</button>
      <RouterLink to="/" class="btn btn--ghost">← Back to Home</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref, onErrorCaptured } from 'vue'
import { RouterLink } from 'vue-router'

const hasError = ref(false)
const errorMessage = ref('')

onErrorCaptured((err) => {
  hasError.value = true
  errorMessage.value = err?.message || 'An unexpected error occurred.'
  // Return false to stop propagation
  return false
})

function reset() {
  hasError.value = false
  errorMessage.value = ''
}
</script>
