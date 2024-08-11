<script setup lang="ts">
import type { Field } from '@directus/types'

withDefaults(defineProps<{
  field: Field
  label: string
  value?: string
  error?: boolean
  autocomplete?: string
}>(), {
  autocomplete: 'new-password',
})

const model = defineModel<string>({ default: '' })
</script>

<template>
  <InputPassword
    v-model="model"
    :label
    :error
    :autocomplete
  />
</template>
