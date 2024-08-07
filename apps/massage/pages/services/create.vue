<script setup lang="ts">
const props = defineProps<{
  type: string
}>()
const emit = defineEmits<{
  (event: 'save', item: Record<string, any>): void
}>()
const collection = 'services'
const { createItem } = useCollection(collection)
const groups = [
  {
    fields: [
      { field: 'name', label: '$t:name' },
      { field: 'price', label: '$t:price' },
    ],
  },
  {
    fields: [
      { field: 'type', label: '$t:type' },
    ],
  },
]
async function submit(data: Record<string, any>) {
  const item = await createItem(data)
  emit('save', item)
}
</script>

<template>
  <Form
    :collection
    :groups
    :submit
    :values="{ type: props.type }"
  />
</template>
