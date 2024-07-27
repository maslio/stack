<script setup lang="ts">
withDefaults(defineProps<{
  user: Record<string, any>
  size: string
}>(), {
  size: '20',
})
</script>

<template>
  <div
    class="relative overflow-hidden rounded-full"
    :style="{ width: `${size}px`, height: `${size}px` }"
  >
    <NuxtImg
      v-if="user.avatar"
      provider="directus"
      format="webp"
      :src="user.avatar"
      :width="size"
      :height="size"
    />
    <div v-else>
      <NuxtIcon
        class="text-neutral"
        name="material-symbols:account-circle"
        :size
      />
    </div>
  </div>
</template>
