<script setup lang="ts">
import { aggregate } from '@directus/sdk'

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

const allQuota = computed(() => {
  return branches.value.reduce((sum, branch) => sum + branch.quota, 0)
})
</script>

<template>
  <Date v-model="date" icon="date" icon-color="primary" />
  <Stat
    label="$t:all"
    :value="sum()"
    :quota="allQuota"
  />
  <List :items="branches">
    <template #item="{ item, index }">
      <div>
        <Separator v-if="index" />
        <Stat
          :label="item.name"
          page="reports/branch"
          :props="{ branch: item, date, onRefresh: refresh }"
          :value="sum(item.id)"
          :quota="item.quota"
        />
      </div>
    </template>
  </List>
</template>
