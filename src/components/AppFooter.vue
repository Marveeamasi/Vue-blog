<template>
  <footer class="footer">
    <div class="container footer__inner">
      <p class="footer__copy">
        © {{ year }} Edy's Blog · Powered by
        <a href="https://api.oluwasetemi.dev" target="_blank" rel="noopener noreferrer">
          api.oluwasetemi.dev
        </a>
      </p>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>
