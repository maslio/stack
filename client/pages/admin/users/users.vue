<script setup lang="ts">
import { readUsers } from '@directus/sdk'

defineProps<{
  create?: boolean
}>()

const { request } = useDirectus()
const { data: users } = useAsyncData('user.list', async () => {
  const users = await request(readUsers({ fields: [
    'id',
    'avatar',
    'email',
    'first_name',
    'last_name',
  ] }))
  return users
})
</script>

<template>
  <List
    :items="users"
    item-key="id"
    v-slot="{ item: user }"
  >
    <Open
      page="admin/users/user"
      :label="getUsername(user)"
      :props="{ id: user.id }"
      :skeleton="['h-25 w-25 rounded-full', 'h-22', 'h-22']"
    >
      <Avatar :src="user.avatar" size="30" />
      <Text :label="getUsername(user)" :caption="user.email ?? ''" />
    </Open>
  </List>

  <Open
    icon="material-symbols:add"
    label="$t:create_a_user"
    page="admin/users/create"
    skeleton="h-28 h-10"
  />
</template>
