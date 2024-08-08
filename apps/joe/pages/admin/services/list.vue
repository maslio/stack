<script setup lang="ts">
const { items } = await useItems('services', {
  live: true,
})
const layout = useLayout()
const tabs = [
  { label: '$t:massage_service', value: 'massage' },
  { label: '$t:nail_service', value: 'nails' },
]
const tab = ref('massage')
function onCreate(item: Record<string, any>) {
  layout.open('next', {
    page: 'services/edit',
    props: { id: item.id },
  })
}
const filteredItems = computed(() => {
  return items.value.filter(item => item.type === tab.value)
})
</script>

<template>
  <Card>
    <Tabs v-model="tab" :tabs />
    <List :items="filteredItems">
      <template #item="{ item }">
        <Open
          :label="item.name"
          page="services/edit"
          :props="{ id: item.id }"
        >
          <div>
            <div>{{ item.name }}</div>
            <div class="text-sm font-mono text-faint">
              {{ Number(item.price).toFixed(0) }}฿
            </div>
          </div>
        </Open>
      </template>
    </List>
  </Card>
  <Open
    label="$t:create_a_service"
    icon="material-symbols:add"
    page="services/create"
    :props="{ onSave: onCreate, type: tab }"
  />
</template>
