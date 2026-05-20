<template>
  <nav v-if="meta && meta.totalPages > 1" class="pagination" aria-label="Pagination">
    <button
      class="pagination__btn"
      :disabled="!meta.hasPreviousPage"
      @click="$emit('change', meta.page - 1)"
    >
      ← Prev
    </button>

    <span class="pagination__info">
      Page {{ meta.page }} of {{ meta.totalPages }}
    </span>

    <button
      class="pagination__btn"
      :disabled="!meta.hasNextPage"
      @click="$emit('change', meta.page + 1)"
    >
      Next →
    </button>
  </nav>
</template>

<script setup>
defineProps({
  meta: {
    type: Object,
    default: null
  }
})
defineEmits(['change'])
</script>
