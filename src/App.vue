<template>
  <div class="app">
    <AppNavbar />

    <!-- ErrorBoundary wraps all route views -->
    <ErrorBoundary>
      <!--
        Suspense enables async component lazy-loading (defineAsyncComponent / async setup).
        The fallback slot is shown while the lazy route chunk is being fetched.
      -->
      <Suspense>
        <!-- Default slot: the actual page -->
        <RouterView />

        <!-- Fallback slot: shown while the lazy-loaded chunk loads -->
        <template #fallback>
          <div class="suspense-fallback" aria-live="polite" aria-label="Loading page">
            <div class="suspense-fallback__spinner"></div>
            <p class="suspense-fallback__text">Loading…</p>
          </div>
        </template>
      </Suspense>
    </ErrorBoundary>

    <AppFooter />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import AppNavbar from './components/AppNavbar.vue'
import AppFooter from './components/AppFooter.vue'
import ErrorBoundary from './components/ErrorBoundary.vue'
</script>
