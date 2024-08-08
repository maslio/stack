<script setup lang="ts">
const props = defineProps<{
  salon: Record<string, any>
  report: Record<string, any>
  sales: number
  expenses: number
}>()
const emit = defineEmits<{
  (event: 'save', value: number): void
}>()
const format = useIntlNumberFormat()

const today = dateFormat(new Date())
const { createItem, updateItem } = useCollection('reports')
const layout = useLayout()

const value = ref(props.report ? Number(props.report.amount) : 0)
async function save() {
  if (props.report)
    await updateItem(props.report.id, { amount: value.value })
  else
    await createItem({ salon: props.salon.id, date: today, amount: value.value })
  emit('save', value.value)
  layout.close()
}
</script>

<template>
  <Card>
    <Item>
      <div class="flex justify-between">
        <div>
          {{ $t('sales') }}
        </div>
        <div class="font-mono">
          +{{ format(props.sales) }}
        </div>
      </div>
    </Item>
    <Item>
      <div class="flex justify-between">
        <div>
          {{ $t('expenses') }}
        </div>
        <div class="font-mono">
          {{ format(-props.expenses) }}
        </div>
      </div>
    </Item>
    <Item>
      <div class="flex justify-between">
        <div>
          {{ $t('profit') }}
        </div>
        <div class="font-mono">
          {{ format(props.sales - props.expenses) }}
        </div>
      </div>
    </Item>
  </Card>
  <InputNumber
    v-model="value"
    input-class="text-right"
    label="$t:report"
  />
  <Button
    :disabled="!value"
    color="primary"
    label="$t:save"
    :click="save"
  />
</template>
