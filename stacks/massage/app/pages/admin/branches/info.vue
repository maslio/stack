<script setup lang="ts">
const props = defineProps<{
  id: number
}>()
const { item, refresh: refreshBranch } = await useItem('branches', props.id, {
  fields: ['id', 'name', 'address', 'quota', 'manager.avatar', 'manager.id'],
})

const layout = useLayout()
async function onSave() {
  await refreshBranch()
  layout.close('next')
}
</script>

<template>
  <Card>
    <Item icon="material-symbols:drive-file-rename-outline">
      <div class="___ text-sm text-faint">
        {{ $t('name') }}
      </div>
      <div>{{ item.name }}</div>
    </Item>
    <Separator inset />
    <Item icon="material-symbols:add-location">
      <div class="___ text-sm text-faint">
        {{ $t('address') }}
      </div>
      <div>{{ item.address }}</div>
    </Item>
    <Separator inset />
    <Item icon="material-symbols:request-quote-sharp">
      <div class="text-sm text-faint">
        {{ $t('quota') }}
      </div>
      <Currency :value="item.quota" class="" />
    </Item>
  </Card>
  <Card>
    <Open
      page="admin/branches/edit"
      label="$t:edit_branch"
      :props="{ id: props.id, onSave }"
      icon="material-symbols-light:edit"
      icon-color="primary"
    />
    <Separator inset />
    <Open
      page="admin/branches/workers/list"
      label="$t:workers"
      :props="{ id: props.id, onSave }"
      icon="material-symbols:emoji-people"
      icon-color="primary"
    />
    <Separator inset />
    <Open
      page="admin/branches/manager"
      label="$t:manager"
      :props="{ branch: item.id, manager: item.manager?.id, onSave }"
      icon="material-symbols:manage-accounts-rounded"
      icon-color="primary"
    >
      <div class="flex items-center justify-between gap-2">
        <div>{{ $mt('$t:manager') }}</div>
        <div class="h-30px">
          <div v-if="item.manager">
            <Avatar :src="item.manager.avatar" size="30" />
          </div>
        </div>
      </div>
    </Open>
  </Card>
  <div class="px-1 text-sm text-faint">
    {{ $t('hint.branch_manager_hint') }}
  </div>
</template>
