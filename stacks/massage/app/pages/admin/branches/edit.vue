<script setup lang="ts">
const props = defineProps<{
  id: number
}>()
const emit = defineEmits<{
  (event: 'save', item: Record<string, any>): void
}>()
const layout = useLayout()
const { item, updateItem } = await useItem('branches', props.id)
const groups = [
  {
    fields: [
      { field: 'name', label: '$t:name' },
      { field: 'address', label: '$t:address' },
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
    collection="branches"
    :groups="groups"
    :values="item"
    :submit
  />
</template>
