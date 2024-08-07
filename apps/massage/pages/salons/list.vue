<script setup lang="ts">
const { items } = await useItems('salons', {
  live: true,
})
const layout = useLayout()
const tabs = [
  { label: '$t:massage_shop', value: 'massage' },
  { label: '$t:nail_shop', value: 'nails' },
]
const tab = ref('massage')
function onCreate(item: Record<string, any>) {
  layout.open('next', {
    page: 'salons/edit',
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
      <template #item="{ item, index }">
        <Open
          :label="item.name"
          page="salons/edit"
          :props="{ id: item.id }"
        >
          <div class="flex items-center gap-4">
            <div class="w-4 text-center">
              <div class="font-mono">
                {{ index + 1 }}
              </div>
            </div>
            <div>
              <div>{{ item.name }}</div>
              <div class="text-sm text-faint">
                {{ item.location }}
              </div>
            </div>
          </div>
        </Open>
      </template>
    </List>
  </Card>
  <Open
    label="$t:create_a_salon"
    icon="material-symbols:add"
    page="salons/create"
    :props="{ onSave: onCreate, type: tab }"
  />
</template>
