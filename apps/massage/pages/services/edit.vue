<script setup lang="ts">
const props = defineProps<{
  id: number
}>()
const emit = defineEmits<{
  (event: 'save', item: Record<string, any>): void
}>()
const layout = useLayout()
const { item, updateItem } = await useItem('services', props.id)
// const fields = [
//   { field: 'name', label: '$t:name' },
//   { field: 'price', label: '$t:price' },
// ]
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
  updateItem(data)
  emit('save', data)
  layout.close()
}
</script>

<template>
  <Form
    collection="services"
    :groups="groups"
    :values="item"
    :submit
  />
</template>
