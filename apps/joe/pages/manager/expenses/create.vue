<script setup lang="ts">
const props = defineProps<{
  salon: Record<string, any>
}>()

const emit = defineEmits<{
  (event: 'save', expense: Expense): void
}>()

interface Expense {
  comment: string
  amount: number | null
  worker: number | null
  salon: number
}

const { createItem: createExpense } = useCollection('expenses')

const expense = ref<Expense>({
  comment: '',
  amount: null,
  worker: null,
  salon: props.salon.id,
})

async function submit() {
  await createExpense(expense.value)
  emit('save', expense.value)
}
</script>

<template>
  <Card>
    <SelectItems
      v-model="expense.worker"
      label="$t:worker"
      collection="workers"
      :fields="['id', 'name']"
      :filters="{ salon: props.salon.id }"
      close-on-apply
      apply-on-change
    />
  </Card>
  <Card>
    <InputText v-model="expense.comment" label="$t:comment" />
    <InputNumber v-model="expense.amount" label="$t:amount" />
  </Card>

  <Button
    :disabled="!expense.amount || !expense.comment"
    color="primary"
    label="$t:save"
    :click="submit"
  />
</template>
