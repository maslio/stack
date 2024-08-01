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
    v-slot="{ item: user }"
    :items="users"
    item-key="id"
  >
    <Open
      page="admin/users/edit"
      :label="getUsername(user)"
      :props="{ id: user.id }"
    >
      <Avatar :src="user.avatar" size="30" />
      <Text :label="getUsername(user)" :caption="user.email ?? ''" />
    </Open>
  </List>

  <Open
    icon="material-symbols:add"
    label="$t:create_a_user"
    page="admin/users/create"
    placeholder="h-114px h-40px"
  />

  <!-- <Open ref="edit" v-slot="{ props }">
    <UserEdit
      :id="props.id"
      @save="refresh()"
      @delete="refresh(); edit?.close()"
    />
  </Open>
  <Open ref="create" label="$t:create_a_user">
    <UserCreate @save="refresh(); create?.close()" />
  </Open> -->
</template>
