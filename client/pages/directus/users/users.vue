<script setup lang="ts">
import { readUsers } from '@directus/sdk'

defineProps<{
  create?: boolean
}>()

const { request } = useDirectus()
const { data: users } = await useAsyncData('user.list', async () => {
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
  >
    <template #item="{ item: user }">
      <Open
        page="directus/users/edit"
        :label="getUsername(user)"
        :props="{ id: user.id }"
        :skeleton="['h-25 w-25 rounded-full', 'h-22', 'h-22']"
      >
        <div class="flex items-center gap-3">
          <Avatar :src="user.avatar" size="30" />
          <Text :label="getUsername(user)" :caption="user.email ?? ''" />
        </div>
      </Open>
    </template>
  </List>

  <Open
    icon="material-symbols:add"
    label="$t:create_a_user"
    page="directus/users/create"
    skeleton="h-28 h-28 h-10"
  />
</template>
