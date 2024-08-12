<script setup lang="ts">
import { endOfDay, startOfDay } from 'date-fns'

const props = defineProps<{
  salon: Record<string, any>
}>()
const emit = defineEmits<{
  (event: 'update'): void
}>()
const date = dateFormat(new Date())
const layout = useLayout()
const { items, refresh } = await useItems('expenses', {
  fields: ['id', 'comment', 'date', 'worker.name', 'amount'],
  filter: {
    salon: props.salon.id,
    date: { _between: [startOfDay(date), endOfDay(date)] },
  },
  sort: ['date'],
})

function amount(amount: string) {
  return `${Number(amount).toFixed(0)} ฿`
}
function onSave() {
  refresh()
  layout.close('next')
  emit('update')
}
</script>

<template>
  <List :items="items">
    <template #item="{ item }">
      <Item>
        <div class="flex items-center justify-between">
          <div>
            <div>{{ item.comment }}</div>
            <div v-if="item.worker" class="text-sm text-faint">
              {{ item.worker.name }}
            </div>
          </div>
          <div class="font-mono">
            {{ amount(item.amount) }}
          </div>
        </div>
      </Item>
    </template>
  </List>
  <Open
    icon="material-symbols:add"
    label="$t:add_an_expense"
    page="manager/expenses/create"
    :props="{ salon: props.salon, onSave }"
  />
</template>
