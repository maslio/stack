<script setup lang="ts">
defineProps<{
  vertical?: boolean
  inset?: boolean
}>()
</script>

<template>
  <hr
    :class="{ vertical, inset }"
    light="bg-neutral-300/50"
    dark="bg-neutral-600/50"
  >
</template>

<style scoped>
hr {
  --uno: w-full h-1px border-none;
}
hr.inset {
  --uno: px-2 py-0;
}
hr.vertical {
  --uno: w-1px h-full;
}
hr.vertical.inset {
  --uno: py-2 px-0;
}
</style>
