<script setup lang="ts">
import type { Field } from '@directus/types'

const { field } = defineProps<{
  field: Field
  label: string
  value?: string
}>()

// @ts-expect-error this is ok
const options = field.meta?.options.choices.map(opt => ({
  value: opt.value,
  label: opt.text,
}))

const model = defineModel<string>()
</script>

<template>
  <Select
    v-model="model"
    :label="label"
    :options
    option-value="value"
    option-label="label"
    close-on-apply
    apply-on-change
  />
</template>
