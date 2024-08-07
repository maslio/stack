<script setup lang="ts">
const props = defineProps<{
  id: number
}>()
const emit = defineEmits<{
  (event: 'save', item: Record<string, any>): void
}>()
const layout = useLayout()
const { item, updateItem } = await useItem('salons', props.id)
const groups = [
  {
    fields: [
      { field: 'name', label: '$t:name' },
      { field: 'location', label: '$t:location' },
    ],
  },
  {
    fields: [
      { field: 'type', label: '$t:type' },
      { field: 'manager', label: '$t:manager' },
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
    collection="salons"
    :groups="groups"
    :values="item"
    :submit
  />
</template>
