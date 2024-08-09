<script setup lang="ts">
const props = defineProps<{
  branch: number
  manager?: string
}>()

const emit = defineEmits(['save'])
const { items } = await useItems('directus_users', {
  fields: ['id', 'first_name', 'last_name', 'avatar'],
})
const { updateItem } = useCollection('branches')
const model = ref<string | null>(props.manager ?? null)
const search = ref('')
const options = computed(() => {
  const users = items.value.filter(item => getUsername(item).toLocaleLowerCase().includes(search.value.toLocaleLowerCase()))
  return users
})
async function save() {
  await updateItem(props.branch, { manager: model.value })
  emit('save', model.value)
}
</script>

<template>
  <List v-model:search="search" :items="options">
    <template #item="{ item }">
      <Option v-model="model" :value="item.id">
        <div class="flex items-center gap-2">
          <Avatar :src="item.avatar" size="30" />
          <span>{{ getUsername(item) }}</span>
        </div>
      </Option>
    </template>
  </List>
  <Button label="$t:save" color="primary" :click="save" />
</template>
