<script setup lang="ts">
const { branch, date } = defineProps<{
  branch: Record<string, any>
  date: string
}>()
const emit = defineEmits<{
  refresh: []
}>()
const today = dateFormat(new Date())
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
  emit('refresh')
}
function formatTime(date: string) {
  return date.substring(11, 16)
}
const format = useIntlDateFormat({
  dateStyle: 'full',
})

const sumServices = computed(() => {
  let sum = 0
  for (const i of services.value)
    sum += Number(i.amount)
  return sum
})
const sumExpenses = computed(() => {
  let sum = 0
  for (const i of expenses.value)
    sum += Number(i.amount)
  return sum
})
const sum = computed(() => {
  return Math.round(sumServices.value - sumExpenses.value)
})
</script>

<template>
  <!-- <div class="flex items-stretch gap-3"> -->
  <Card class="h-full flex-1">
    <Item icon="material-symbols:store">
      <div class="text-sm text-faint">
        {{ $t('branch') }}
      </div>
      <div>{{ branch.name }}</div>
    </Item>
    <Item icon="material-symbols:calendar-month">
      <div class="text-sm text-faint">
        {{ $t('date') }}
      </div>
      <div>{{ format(date) }}</div>
    </Item>
    <Item icon="expense">
      <div class="flex gap-10">
        <div>
          <div class="text-sm text-faint">
            {{ $t('profit') }}
          </div>
          <Currency :value="sum" class="" />
        </div>
        <div>
          <div class="text-sm text-faint">
            {{ $t('quota') }}
          </div>
          <Currency :value="branch.quota" class="" />
        </div>
      </div>
    </Item>
  </Card>
  <!--
    <Card class="h-full flex-1">
      <div class="ml-3 mt-3 text-sm text-faint">
        {{ $t('profit') }}
      </div>
      <Item>
        <div class="flex items-center justify-between font-mono">
          <div>+&nbsp;</div>
          <Currency class="text-right font-mono" :value="sumServices" />
        </div>
      </Item>
      <Item>
        <div class="flex items-center justify-between font-mono">
          <div>-&nbsp;</div>
          <Currency class="text-right font-mono" :value="sumExpenses" />
        </div>
      </Item>
      <Separator />
      <Item>
        <div class="flex items-center justify-between font-mono">
          <div>=</div>
          <Currency class="text-right font-mono" :value="sum" />
        </div>
      </Item>
    </Card> -->
  <!-- </div> -->

  <template v-if="services.length">
    <div class="mx-3 mt-3 flex items-end justify-between">
      <div class="font-semibold">
        {{ $t('services') }}
      </div>
      <Currency :value="sumServices" />
    </div>
    <List v-if="services.length" :items="services">
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
  </template>

  <template v-if="expenses.length">
    <div class="mx-3 mt-3 flex items-end justify-between">
      <div class="font-semibold">
        {{ $t('expenses') }}
      </div>
      <Currency :value="sumExpenses" />
    </div>
    <List :items="expenses">
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
  </template>
  <Sticky v-if="date === today">
    <Open
      icon="material-symbols:add"
      icon-color="primary"
      label="$t:add"
      page="reports/item"
      :props="{ branch, date, onSave: refresh }"
    />
  </Sticky>
</template>
