<script setup lang="ts">
import type { User } from '@directus/types'
import { readRoles } from '@directus/sdk'

const { user } = defineProps<{
  user: User
}>()
const emit = defineEmits<{
  save: []
}>()

const currentRole = ref(user.role?.id)
const { request } = useDirectus()

const roles = await request(readRoles({ sort: ['name'] }))
const options = roles.map(role => ({
  value: role.id,
  item: {
    label: role.name,
  },
}))

async function click() {
  await request(updateUser(user.id, {
    role: currentRole.value,
  }))
  emit('save')
}
</script>

<template>
  <Select
    v-model="currentRole"
    :options
  />
  <Button
    color="primary"
    label="Сохранить"
    :click
  />
</template>
