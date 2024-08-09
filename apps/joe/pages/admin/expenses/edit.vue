<script setup lang="ts">
const props = defineProps<{
  id?: number
}>()

const emit = defineEmits<{
  (event: 'save'): void
}>()

const { readItem, updateItem, createItem } = await useCollection('expenses')
const item = ref(props.id
  ? await readItem(props.id)
  : {
      name: '',
      amount: null,
    })

async function save() {
  if (props.id) {
    await updateItem(props.id, {
      name: item.value.name,
      amount: item.value.amount,
    })
  }
  else {
    await createItem({
      name: item.value.name,
      amount: item.value.amount,
    })
  }
  emit('save')
}
</script>

<template>
  <Card>
    <InputString v-model="item.name" label="$t:name" />
    <InputNumber v-model="item.amount" label="$t:amount" />
  </Card>
  <Button
    color="primary" :click="save" label="$t:save"
    :disabled="!item.name"
  />
</template>
