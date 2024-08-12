<script setup lang="ts">
const { branch, date } = defineProps<{
  branch: Record<string, any>
  date: string
}>()

const { items: expenses, refresh: refreshExpenses } = await useItems('expense_items', {
  filter: { date: between(date), branch: branch.id },
  fields: ['id', 'date', 'expense.name', 'amount'],
})
const { items: services, refresh: refreshServices } = await useItems('service_items', {
  filter: { date: between(date), branch: branch.id },
  fields: ['id', 'date', 'service.name', 'amount'],
})
function refresh() {
  refreshExpenses()
  refreshServices()
}
function formatTime(date: string) {
  return date.substring(11, 16)
}
</script>

<template>
  <ReportHeader :branch="branch" :date="date" />

  <List v-if="services.length" :items="services" label="$t:services">
    <template #item="{ item, index }">
      <Open
        label="$t:services"
        page="reports/item"
        :props="{ branch, date, type: 'service', id: item.id, onSave: refresh }"
      >
        <div class="flex gap-2">
          <div class="w-4 font-mono">
            {{ index + 1 }}.
          </div>
          <div class="w-10 text-faint">
            {{ formatTime(item.date) }}
          </div>
          <div class="flex-1">
            {{ item.service?.name }}
          </div>
          <div class="text-faint">
            {{ $formatBaht(item.amount) }}
          </div>
        </div>
      </Open>
    </template>
  </List>
  <List v-if="expenses.length" :items="expenses" label="$t:expenses">
    <template #item="{ item, index }">
      <Open
        label="$t:expense"
        page="reports/item"
        :props="{ branch, date, type: 'expense', id: item.id, onSave: refresh }"
      >
        <div class="flex gap-2">
          <div class="w-4 font-mono">
            {{ index + 1 }}.
          </div>
          <div class="w-10 text-faint">
            {{ formatTime(item.date) }}
          </div>
          <div class="flex-1">
            {{ item.expense?.name }}
          </div>
          <div class="text-faint">
            {{ $formatBaht(item.amount) }}
          </div>
        </div>
      </Open>
    </template>
  </List>
  <Open
    icon="material-symbols:add"
    label="$t:add"
    page="reports/item"
    :props="{ branch, date, onSave: refresh }"
  />
</template>
