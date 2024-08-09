<script setup lang="ts">
const props = defineProps<{
  id: number
}>()
const { item, refresh: refreshBranch } = await useItem('branches', props.id)

const layout = useLayout()
function onSave() {
  refreshBranch()
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
      page="admin/branches/edit"
      label="$t:edit_branch"
      :props="{ id: props.id, onSave }"
      icon="material-symbols-light:edit"
    />
    <Open
      page="admin/branches/workers/list"
      label="$t:workers"
      :props="{ id: props.id, onSave }"
      icon="material-symbols:emoji-people"
    />
  </Card>
</template>
