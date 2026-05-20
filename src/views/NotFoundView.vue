<template>
  <main class="not-found">
    <div class="not-found__inner container">
      <p class="not-found__code">404</p>
      <h1 class="not-found__title">Page Not Found</h1>
      <p class="not-found__message">
        Oops! The page you were looking for doesn't exist.<br />
        It may have been moved, renamed, or never existed.
      </p>
      <div class="not-found__actions">
        <RouterLink to="/" class="btn btn--primary">← Back to Home</RouterLink>
        <button class="btn btn--ghost" @click="$router.back()">Go Back</button>
      </div>
      <div class="not-found__path">
        Attempted path: <code>{{ $route.fullPath }}</code>
      </div>
    </div>
  </main>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
