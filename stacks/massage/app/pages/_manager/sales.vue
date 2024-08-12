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
const { items, refresh } = await useItems('sales', {
  fields: ['id', 'date', 'service.name', 'price'],
  filter: {
    salon: props.salon.id,
    date: { _between: [startOfDay(date), endOfDay(date)] },
  },
  sort: ['date'],
})
function time(date: string) {
  return date.substring(11, 16)
}
function price(price: string) {
  return `${Number(price).toFixed(0)} ฿`
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
      <Open
        :label="item.date"
        page="manager/sales/edit"
        :props="{ sale: item.id, salon: props.salon.id, onSave }"
      >
        <div class="flex items-center justify-between">
          <div>
            <div class="text-sm text-faint">
              {{ time(item.date) }}
            </div>
            <div>{{ item.service.name }}</div>
          </div>
          <div class="font-mono">
            {{ price(item.price) }}
          </div>
        </div>
      </Open>
    </template>
  </List>
  <Open
    icon="material-symbols:add"
    label="$t:create_a_sale"
    page="manager/sales/create"
    :props="{ salon: props.salon, onSave }"
  />
</template>
