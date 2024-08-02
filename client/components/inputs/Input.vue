<script setup lang="ts">
import Item from '../elements/Item.vue'

defineProps<{
  label?: string
  icon?: string
  focused?: boolean
  readonly?: boolean
  disabled?: boolean
  error?: boolean
  flat?: boolean
}>()
const emit = defineEmits(['click'])

defineSlots<{
  default: () => any
}>()
</script>

<template>
  <Item
    :icon
    class="input"
    :class="{ focused: (focused && !readonly) }"
    @click="emit('click', $event)"
  >
    <div flex-1>
      <div
        v-if="label"
        class="mt--1px text-sm"
        :class="error ? 'text-negative' : 'text-faint'"
      >
        {{ $mt(label) }}
      </div>
      <div
        v-if="$slots.default"
        class="flex items-center border-b-1 transition-200"
        light="border-b-neutral-200 focused:border-b-neutral-300 text-neutral-700"
        dark="border-b-dark-200 focused:border-b-dark-100 text-neutral-300"
        :class="{ 'border-none!': flat || readonly }"
      >
        <slot name="default" />
      </div>
    </div>
  </Item>
</template>
