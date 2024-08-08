<script setup lang="ts">
const { items, refresh } = await useItems('workers', {
  fields: ['id', 'name', 'salon.id', 'salon.name'],
})
const layout = useLayout()
const salon = ref<number>()
function onCreate(item: Record<string, any>) {
  layout.open('next', {
    page: 'workers/edit',
    props: { id: item.id, onSave: onUpdate },
  })
  refresh()
}
function onUpdate() {
  refresh()
}
const filteredItems = computed(() => {
  return items.value.filter(item => item.salon?.id === salon.value)
})
</script>

<template>
  <SelectItems
    v-model="salon"
    label="$t:salon"
    collection="salons"
    fields="id name"
    apply-on-change
    close-on-apply
  />
  <Card>
    <List :items="filteredItems">
      <template #item="{ item, index }">
        <Open
          :label="item.name"
          page="workers/edit"
          :props="{ id: item.id, onSave: onUpdate }"
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
                {{ item.salon?.name }}
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
    page="workers/create"
    :props="{ onSave: onCreate, salon }"
  />
</template>
