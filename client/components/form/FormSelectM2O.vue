<script setup lang="ts">
import type { Field } from '@directus/types'

const { field } = defineProps<{
  field: Field
  label: string
  value?: string | number | null
}>()

const collection = field.schema?.foreign_key_table as string

const template = field?.meta?.options?.template ?? '{{name}}' as string
const { fields: templateFields, parse: parseTemplate } = useTemplateString(template)

const fields = (() => {
  return templateFields
})()
const model = defineModel<string>()

function addId(fields: string[]) {
  return ['id', ...fields]
}
</script>

<template>
  <SelectItems
    v-model="model"
    :label="label"
    :collection
    :option-label="parseTemplate"
    :fields="addId(fields)"
    close-on-apply
    apply-on-change
  >
    <template #item="{ item }">
      <div>{{ parseTemplate(item) }}</div>
    </template>
  </SelectItems>
</template>
