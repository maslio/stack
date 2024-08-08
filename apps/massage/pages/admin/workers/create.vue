<script setup lang="ts">
const props = defineProps<{
  salon: number
}>()
const emit = defineEmits<{
  (event: 'save', item: Record<string, any>): void
}>()
const { createItem } = useCollection('workers')
const groups = [
  {
    fields: [
      { field: 'name', label: '$t:name' },
    ],
  },
  {
    fields: [
      { field: 'type', label: '$t:type' },
      { field: 'salon', label: '$t:salon' },
    ],
  },
]
const values = {
  salon: props.salon,
  type: 'employee',
}
async function submit(data: Record<string, any>) {
  const item = await createItem(data)
  emit('save', item)
}
</script>

<template>
  <Form
    collection="workers"
    :groups
    :submit
    :values
  />
</template>
