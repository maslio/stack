<script setup lang="ts">
defineProps<{
  branch: Record<string, any>
  date: string
}>()
// const format = useIntlDateFormat({
//   dateStyle: 'full',
// })
</script>

<template>
  <div>Expenses</div>
</template>
