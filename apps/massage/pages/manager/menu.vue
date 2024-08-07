<script setup lang="ts">
import { aggregate } from '@directus/sdk'

const { $user } = useNuxtApp()
const { items } = await useItems('salons', {
  filter: {
    manager: $user.value.id,
  },
})
const salon = items.value[0]
const date = computed(() => {
  const format = useIntlDateFormat({ month: 'long', day: 'numeric' })
  return format(new Date())
})
const { request } = useDirectus()
const { data: salesSum, refresh: refreshSalesSum } = await useAsyncData('manager.sales.sum', async () => {
  const result = await request<{ sum: { price: number } }[]>(aggregate('sales', {
    filter: {
      salon: salon!.id,
    },
    aggregate: {
      sum: ['price'],
    },
  }))
  if (result && result[0])
    return result[0].sum.price as number
  return 0
})

function onUpdate() {
  refreshSalesSum()
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
      :value="String(salesSum)"
    />
    <Open
      label="$t:expenses"
      page="manager/expenses"
      :props="{ salon }"
    />
  </Card>
  <Card>
    <Open
      label="$t:report"
      page="manager/report"
      :props="{ salon }"
    />
  </Card>
</template>
