<script setup lang="ts">
import type { Field } from '@directus/types'

defineOptions({
  inheritAttrs: false,
})

const { field } = defineProps<{
  field: Field
  label: string
  value?: string
}>()

interface Option {
  value: string
  label: string
}

// @ts-expect-error this is ok
const options = field.meta?.options.choices.map(opt => ({
  value: opt.value,
  label: opt.text,
})) as Option[]

const model = defineModel<string>()
</script>

<template>
  <List
    v-model="model"
    :label="label"
    :items="options"
    item-key="value"
  >
    <template #item="{ item }">
      <Option v-model="model" :label="item.label" :value="item.value" />
    </template>
  </List>
</template>
