<script setup lang="ts">
const props = defineProps<{
  id?: number
  branch: Record<string, any>
  date: string
}>()

const { readItem, createItem, updateItem } = useCollection('service_items')

interface ServiceItem {
  branch: number
  date: string
  service: number | null
  duration: number | null
  amount: number | null
}
const data = props.id
  ? await readItem(props.id)
  : {
      branch: props.branch.id,
      date: props.date,
      service: null,
      duration: null,
      amount: null,
    } as ServiceItem
const item = ref(data)
function onSelectService(service: Record<string, any>) {
  console.log(service)
}
</script>

<template>
  <ReportHeader :branch="branch" :date="date" />
  <Card>
    <SelectService :model-value="item.service" @select="onSelectService" />
  </Card>
</template>
