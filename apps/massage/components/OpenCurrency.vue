<script setup lang="ts">
defineProps<{
  icon?: string
  label: string
  value?: number | string
}>()
</script>

<template>
  <Open :label>
    <div class="flex items-center justify-between gap-2">
      <Icon v-if="icon" :name="icon" />
      <slot v-if="$slots.default" />
      <Text
        v-else :label truncate
        class="flex-1"
      />
      <Currency :value />
    </div>
  </Open>
</template>
