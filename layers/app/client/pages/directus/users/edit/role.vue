<script setup lang="ts">
import { readRoles, updateUser } from '@directus/sdk'

const { user } = defineProps<{
  user: Record<string, any>
}>()
const emit = defineEmits<{
  save: []
}>()

const currentRole = ref(user.role?.id)
const { request } = useDirectus()

const roles = await request(readRoles({ sort: ['name'] }))

async function click() {
  await request(updateUser(user.id, {
    role: currentRole.value,
  }))
  emit('save')
}
</script>

<template>
  <List
    v-model="currentRole"
    :items="roles"
  >
    <template #item="{ item: role }">
      <Option
        v-model="currentRole"
        :value="role.id"
        :label="role.name"
      />
    </template>
  </List>
  <Button
    color="primary"
    label="Сохранить"
    :click
  />
</template>
