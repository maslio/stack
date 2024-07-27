<script setup lang="ts">
import { computed } from '#imports'

const props = defineProps<{
  label?: string
  caption?: string
  truncate?: boolean
  width?: string | number
  flex?: boolean
}>()

defineSlots<{
  default: () => any
}>()

const style = computed(() => {
  if (props.flex)
    return 'flex: 1'
  if (props.width)
    return `width: ${props.width}px`
  return null
})
</script>

<template>
  <div class="item-text overflow-hidden" :style>
    <div v-if="label" :class="{ truncate }">
      {{ $mt(label) }}
    </div>
    <div v-if="caption" class="text-sm text-faint" :class="{ truncate }">
      {{ $mt(caption) }}
    </div>
    <slot v-if="$slots.default" />
  </div>
</template>
