<script setup lang="ts">
const emit = defineEmits<{
  (event: 'save', item: Record<string, any>): void
}>()
const { createItem } = useCollection('services')
const fields = [
  { field: 'name', label: '$t:name' },
  { field: 'price', label: '$t:price' },
]
async function submit(data: Record<string, any>) {
  const item = await createItem(data)
  emit('save', item)
}
</script>

<template>
  <Form
    collection="services"
    :fields="fields"
    :submit
  />
</template>
