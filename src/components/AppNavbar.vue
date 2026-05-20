<template>
  <header class="navbar">
    <div class="navbar__inner container">
      <RouterLink to="/" class="navbar__brand">
        <span class="navbar__logo">✦</span>
        <span class="navbar__name">Edy's Blog</span>
      </RouterLink>

      <nav class="navbar__links">
        <RouterLink to="/" class="navbar__link" :class="{ active: route.name === 'Home' }">
          Home
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { RouterLink, useRoute } from 'vue-router'
const route = useRoute()
</script>
