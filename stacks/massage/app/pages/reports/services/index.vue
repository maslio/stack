<script setup lang="ts">
const { branch, date } = defineProps<{
  branch: Record<string, any>
  date: string
}>()
const { items, refresh } = useItems('service_items', {
  filter: {
    branch: branch.id,
    date,
  },
})
</script>

<template>
  <ReportHeader :branch="branch" :date="date" />
  <List :items>
    <template #item="{ item }">
      <div>{{ item }}</div>
    </template>
  </List>
  <Open
    icon="material-symbols:add"
    label="$t:add_service"
    page="reports/services/edit"
    :props="{ branch, date }"
  />
</template>
