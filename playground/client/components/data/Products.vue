<script setup lang="ts">
const { item } = await useItem('products', 1, {
  fields: ['name'],
  live: true,
})
</script>

<template>
  <div>{{ item }}</div>
</template>
