<script setup lang="ts">
import type { Field } from '@directus/types'

defineProps<{
  field: Field
  label: string
  value?: string
  error?: boolean
  autocomplete?: string
}>()

const model = defineModel<string>({ default: '' })
</script>

<template>
  <InputString
    v-model="model"
    :label
    :error
    :autocomplete
    type="email"
  />
</template>
