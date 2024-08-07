<script setup lang="ts">
import type { Field } from '@directus/types'

const { field } = defineProps<{
  field: Field
  label: string
  value?: string | number | null
}>()

const collection = field.schema?.foreign_key_table as string

const model = defineModel<string>()
</script>

<template>
  <SelectItems
    v-model="model"
    :label="label"
    :collection
    fields="id name"
    close-on-apply
    apply-on-change
  />
</template>
