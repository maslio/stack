<script setup lang="ts">
withDefaults(defineProps<{
  name: string
  size?: string
}>(), {
  size: '18',
})
</script>

<template>
  <div class="flex items-center justify-center rounded p-1">
    <NuxtIcon
      :name="name"
      rounded p-2px
      :size="size"
    />
  </div>
</template>
