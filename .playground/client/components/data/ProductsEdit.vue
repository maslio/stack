<script setup lang="ts">
const { id } = defineProps<{ id: number }>()
const emit = defineEmits<{
  update: [data: Record<string, any>]
}>()
const { item, updateItem } = await useItem('products', id, {
  fields: ['name'],
})
async function submit(data: Record<string, any>) {
  await updateItem(data)
  emit('update', data)
}
</script>

<template>
  <Form
    collection="products"
    fields="name"
    :values="item"
    :submit
  />
</template>
