<script setup lang="ts">
import { aggregate, readItems } from '@directus/sdk'
import { endOfDay, startOfDay } from 'date-fns'

const { $user } = useNuxtApp()
const { items } = await useItems('salons', {
  filter: {
    manager: $user.value.id,
  },
})
const salon = items.value[0]
const today = dateFormat(new Date())
const date = computed(() => {
  const format = useIntlDateFormat({ month: 'long', day: 'numeric' })
  return format(new Date())
})
const { request } = useDirectus()
const { data: salesSum, refresh: refreshSalesSum } = await useAsyncData('manager.sales.sum', async () => {
  const result = await request<{ sum: { price: number } }[]>(aggregate('sales', {
    filter: {
      salon: salon!.id,
      date: { _between: [startOfDay(today), endOfDay(today)] },
    },
    aggregate: { sum: ['price'] },
  }))
  if (result && result[0])
    return Number(result[0].sum.price)
  return 0
})
const { data: expensesSum, refresh: refreshExpensesSum } = await useAsyncData('manager.expenses.sum', async () => {
  const result = await request<{ sum: { amount: number } }[]>(aggregate('expenses', {
    filter: {
      salon: salon!.id,
      date: { _between: [startOfDay(today), endOfDay(today)] },
    },
    aggregate: { sum: ['amount'] },
  }))
  if (result && result[0])
    return Number(result[0].sum.amount)
  return 0
})

const { data: report, refresh: refreshReport } = await useAsyncData('manager.report', async () => {
  const result = await request(readItems('reports', {
    filter: {
      salon: { _eq: salon!.id },
      date: today,
    },
  }))
  if (result && result[0])
    return result[0]
  return null
})
const numberFormat = useIntlNumberFormat()

function onUpdate() {
  refreshSalesSum()
  refreshExpensesSum()
  refreshReport()
}
</script>

<template>
  <Card v-if="salon">
    <Item label="$t:salon" :value="salon.name" />
    <Item label="$t:date" :value="date" />
  </Card>
  <Card v-if="salon">
    <Open
      label="$t:sales"
      page="manager/sales"
      :props="{ salon, onUpdate }"
      :value="numberFormat(salesSum ?? 0)"
    />
    <Open
      label="$t:expenses"
      page="manager/expenses"
      :props="{ salon, onUpdate }"
      :value="numberFormat(expensesSum ?? 0)"
    />
  </Card>
  <Card>
    <Open
      label="$t:report"
      page="manager/report"
      :value="numberFormat(report?.amount ?? 0)"
      :props="{
        salon,
        sales: salesSum ?? 0,
        expenses: expensesSum ?? 0,
        report,
        onSave: onUpdate,
      }"
    />
  </Card>
</template>
