<script setup lang="ts">
const props = defineProps<{
  id: number
}>()
const emit = defineEmits<{
  (event: 'save', item: Record<string, any>): void
}>()
const layout = useLayout()
const { item, updateItem } = await useItem('workers', props.id)
const groups = [
  {
    fields: [
      { field: 'name', label: '$t:person.name' },
    ],
  },
  {
    fields: [
      { field: 'type', label: '$t:type' },
      { field: 'salon', label: '$t:salon' },
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
    collection="workers"
    :groups="groups"
    :values="item"
    :submit
  />
</template>
