<script setup lang="ts">
defineProps<{
  icon?: string
  label: string
  value?: number | string
}>()
const format = useIntlNumberFormat({
  style: 'currency',
  currency: 'THB',
  minimumFractionDigits: 0,
})
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
      <div class="font-mono text-faint">
        {{ format(value ?? 0) }}
      </div>
    </div>
  </Open>
</template>
