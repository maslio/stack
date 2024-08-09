<script setup lang="ts">
const props = defineProps<{
  id: number
}>()
const { item, refresh: refreshBranch } = await useItem('branches', props.id)
const { items: workers, refresh: refreshWorkers } = await useItems('workers', {
  filter: { branch: props.id },
})
const layout = useLayout()
function onSave() {
  refreshBranch()
  refreshWorkers()
  layout.close('next')
}
</script>

<template>
  <Card>
    <Item>
      <div class="___ text-sm text-faint">
        {{ $t('name') }}
      </div>
      <div>{{ item.name }}</div>
    </Item>
    <Item>
      <div class="___ text-sm text-faint">
        {{ $t('address') }}
      </div>
      <div>{{ item.address }}</div>
    </Item>
  </Card>
  <Card>
    <Open
      :id="item.id"
      page="admin/branches/edit"
      label="Edit"
      :props="{ id: props.id, onSave }"
      icon="material-symbols-light:edit"
    />
  </Card>
  <List :items="workers" label="Workers">
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
    :props="{ onSave, branch: item.id }"
  />
</template>
