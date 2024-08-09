<script setup lang="ts">
const props = defineProps<{
  id: number
}>()

const { items, refresh } = await useItems('workers', {
  filter: { branch: props.id },
})
const layout = useLayout()
function onSave() {
  refresh()
  layout.close('next')
}
</script>

<template>
  <List :items="items">
    <template #item="{ item: worker }">
      <Open
        :label="worker.name"
        page="admin/workers/edit"
        :props="{ id: worker.id, onSave }"
      >
        <div class="flex items-center gap-3">
          <Avatar :src="worker.avatar" size="30" />
          <div>
            <div>{{ worker.name }}</div>
            <div class="text-sm text-faint">
              {{ $t(worker.type) }}
            </div>
          </div>
        </div>
      </Open>
    </template>
  </List>
  <Open
    label="$t:add_a_worker"
    icon="material-symbols:add"
    page="admin/workers/create"
    :props="{ onSave, branch: props.id }"
  />
</template>
