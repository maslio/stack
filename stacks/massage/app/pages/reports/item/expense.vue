<script setup lang="ts">
const props = defineProps<{
  branch: Record<string, any>
  date: string
  id?: number
}>()
const emit = defineEmits<{
  save: []
}>()
const { createItem, readItem, updateItem } = useCollection('expense_items')
interface Item {
  branch: number
  date: string
  expense: number | null
  amount: number | null
  comment?: string
}
const data = props.id
  ? await readItem<Item>(props.id)
  : {
      date: props.date,
      branch: props.branch.id,
      expense: null,
      amount: 0,
      comment: '',
    } as Item

const item = ref<Item>(data)
function onApplyExpense(expense: Record<string, any>) {
  if (expense?.amount)
    item.value.amount = expense.amount
}
async function save() {
  if (!item.value.amount)
    throw new Error('$t:amount_is_0')
  if (props.id)
    await updateItem(props.id, item.value)
  else
    await createItem(item.value)
  emit('save')
}
</script>

<template>
  <Card>
    <SelectExpense
      v-model="item.expense"
      icon="expense"
      icon-color="primary"
      @apply="onApplyExpense"
    />
  </Card>
  <Card>
    <InputNumber
      v-model="item.amount"
      label="$t:amount"
    />
    <InputText
      v-model="item.comment"
      label="$t:comment"
    />
  </Card>
  <Button
    label="$t:save"
    color="primary"
    :click="save"
  />
</template>
