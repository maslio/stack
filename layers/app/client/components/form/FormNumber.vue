<script setup lang="ts">
import type { Field } from '@directus/types'

defineProps<{
  field: Field
  label: string
  value?: string
}>()

const model = defineModel<number | string>({ default: null })
</script>

<template>
  <InputNumber
    :model-value="Number(model)"
    :label
    @update:model-value="model = $event"
  />
</template>
