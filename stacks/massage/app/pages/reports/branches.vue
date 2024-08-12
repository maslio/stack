<script setup lang="ts">
import { aggregate } from '@directus/sdk'
import Item from '../../../../../layers/app/client/components/elements/Item.vue'

const date = ref(dateFormat(new Date()))
const { request } = useDirectus()
const { items: branches } = await useItems('branches')
interface Result {
  branch: number
  sum: { amount: string }
}
const { data, refresh } = await useAsyncData(async () => {
  const expenses = await request<Result[]>(aggregate('expense_items', {
    aggregate: { sum: 'amount' },
    groupBy: ['branch'],
    query: { filter: { date: between(date.value) } },
  }))
  const services = await request<Result[]>(aggregate('service_items', {
    aggregate: { sum: 'amount' },
    groupBy: ['branch'],
    query: { filter: { date: between(date.value) } },
  }))
  return { expenses, services }
}, {
  watch: [date],
})
function sum(branch?: number) {
  const services = !branch ? data.value?.services : data.value?.services.filter(i => i.branch === branch)
  const expenses = !branch ? data.value?.expenses : data.value?.expenses.filter(i => i.branch === branch)
  let sum = 0
  if (services?.length) {
    for (const i of services) {
      if (i.sum?.amount)
        sum += Number(i.sum.amount)
    }
  }
  if (expenses?.length) {
    for (const i of expenses) {
      if (i.sum?.amount)
        sum -= Number(i.sum.amount)
    }
  }
  return sum
}
useInterval(5000, { callback() {
  refresh()
} })
</script>

<template>
  <Date v-model="date" icon="date" icon-color="primary" />
  <Item>
    <div class="flex pr-3.5">
      <div class="flex-1">
        {{ $t('all') }}
      </div>
      <Currency :value="sum()" />
    </div>
  </Item>
  <List :items="branches">
    <template #item="{ item }">
      <OpenCurrency
        :label="item.name"
        page="reports/branch"
        :props="{ branch: item, date, onRefresh: refresh }"
        :value="sum(item.id)"
      />
    </template>
  </List>
</template>
