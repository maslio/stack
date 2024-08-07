<script setup lang="ts">
import { createUser } from '@directus/sdk'

const emit = defineEmits<{
  save: [id: string]
}>()
const { request } = useDirectus()
const groups = [
  {
    fields: [
      { field: 'first_name', label: 'First Name' },
      { field: 'last_name', label: 'Last Name' },
    ],
  },
  {
    fields: [
      { field: 'email', label: 'Email', autocomplete: 'username' },
      { field: 'password', label: '$t:password' },
    ],
  },
]

async function save(data: Record<string, any>) {
  const user = await request(createUser(data))
  emit('save', user.id)
}
</script>

<template>
  <Form
    type="create"
    collection="directus_users"
    :groups
    :submit="save"
  />
</template>
