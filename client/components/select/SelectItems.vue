<script setup lang="ts">
import { upperFirst } from 'scule'

type Value = string | number

const props = withDefaults(defineProps<{
  label?: string
  collection: string
  fields: string | string[]
  filter?: Record<string, any>
  modelValue?: Value | Value[] | null
  optionLabel?: string
  optionValue?: string
}>(), {
  optionLabel: 'name',
  optionValue: 'id',
})
const emit = defineEmits(['update:modelValue'])

const label = computed(() => {
  return props.label || upperFirst(props.collection)
})

const fields = computed(() => {
  if (typeof props.fields === 'string')
    return props.fields.split(' ')
  return props.fields
})

const { items } = await useItems(props.collection, {
  fields,
  filter: props.filter,
})
</script>

<template>
  <Select
    :label="label"
    :model-value="modelValue"
    :options="items"
    :option-value="optionValue"
    :option-label="optionLabel"
    @update:model-value="emit('update:modelValue', $event)"
  />
</template>
