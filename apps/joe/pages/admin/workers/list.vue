<script setup lang="ts">
const { items, refresh } = await useItems('workers', {
  fields: ['id', 'name', 'branch', 'type'],
  live: true,
})

const layout = useLayout()
const branch = ref<number>()
function onCreate(item: Record<string, any>) {
  layout.open('next', {
    page: 'admin/workers/edit',
    props: { id: item.id, onSave: onUpdate },
  })
  refresh()
}
function onUpdate() {
  layout.close('next')
  refresh()
}
const search = ref<string>('')
const filteredItems = computed(() => {
  let _items = items.value
  if (branch.value)
    _items = _items.filter(item => item.branch === branch.value)
  if (search.value)
    _items = _items.filter(item => item.name.toLowerCase().includes(search.value.toLowerCase()))
  return _items
})
</script>

<template>
  <SelectBranch v-model="branch" empty />
  <Card>
    <List v-model:search="search" :items="filteredItems">
      <template #item="{ item }">
        <Open
          :label="item.name"
          page="admin/workers/edit"
          :props="{ id: item.id, onSave: onUpdate }"
        >
          <div class="flex items-center gap-3">
            <Avatar :src="item.avatar" size="30" />
            <div>
              <div>{{ item.name }}</div>
              <div class="text-sm text-faint">
                {{ $t(item.type) }}
              </div>
            </div>
          </div>
        </Open>
      </template>
    </List>
  </Card>
  <Open
    label="$t:add_a_worker"
    icon="material-symbols:add"
    page="admin/workers/create"
    :props="{ onSave: onCreate, branch }"
  />
</template>
