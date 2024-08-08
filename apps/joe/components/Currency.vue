<script setup lang="ts">
withDefaults(defineProps<{
  value?: number | string
  class?: string
}>(), {
  class: 'font-mono text-faint',
})

const format = useIntlNumberFormat({
  style: 'currency',
  currency: 'THB',
  minimumFractionDigits: 0,
})
</script>

<template>
  <div :class="$props.class">
    {{ format(value ?? 0) }}
  </div>
</template>
