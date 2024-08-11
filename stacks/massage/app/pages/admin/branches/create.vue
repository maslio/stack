<script setup lang="ts">
const emit = defineEmits<{
  (event: 'save', item: Record<string, any>): void
}>()
const { createItem } = useCollection('branches')
const groups = [
  {
    fields: [
      { field: 'name', label: '$t:name' },
      { field: 'address', label: '$t:address' },
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
    collection="branches"
    :groups
    :submit
  />
</template>
