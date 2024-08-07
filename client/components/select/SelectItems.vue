<script setup lang="ts">
import { upperFirst } from 'scule'

type Value = string | number

const props = withDefaults(defineProps<{
  label?: string
  collection: string
  fields: string | string[]
  filter?: Record<string, any>
  modelValue?: Value | Value[] | null
  optionLabel?: string | ((item: Record<string, any>) => string)
  optionValue?: string
}>(), {
  optionLabel: 'name',
  optionValue: 'id',
})
const emit = defineEmits(['update:modelValue'])
defineSlots<{
  open: []
  item: (props: {
    item: Record<string, any>
    index: number
  }) => any
}>()
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
  >
    <template v-if="$slots.open">
      <slot name="open" />
    </template>
    <template v-if="$slots.item" #item="{ item, index }">
      <slot name="item" :item="item" :index="index" />
    </template>
  </Select>
</template>
