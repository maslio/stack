<script setup lang="ts">
defineProps<{
  vertical?: boolean
  inset?: boolean
  icon?: boolean
}>()
</script>

<template>
  <hr
    :class="{ vertical, inset, icon }"
    light="bg-neutral-300/50"
    dark="bg-neutral-600/50"
  >
</template>

<style scoped>
hr {
  --uno: 'w-full h-1px border-none';
}
hr.inset {
  --uno: 'mx-3 py-0';
}
hr.icon {
  --uno: 'ml-12! py-0';
}
hr.vertical {
  --uno: 'w-1px h-full';
}
hr.vertical.inset {
  --uno: 'py-2 px-0';
}
hr + hr {
  --uno: 'hidden';
}
</style>
