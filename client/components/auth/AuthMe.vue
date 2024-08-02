<script setup lang="ts">
import { readMe } from '@directus/sdk'

const { fields } = withDefaults(defineProps<{
  fields?: string[]
}>(), {
  fields: () => [
    'name',
    'email',
    'avatar',
    'password',
    'langauge',
    'appearance',
  ],
})

const { request, logout } = useDirectus()
const { data: user } = await useAsyncData(async () => {
  return await request(readMe()) as Record<string, any>
})
</script>

<template>
  <Open
    v-if="user"
    :label="getUsername(user)"
    preload
  >
    <template #default>
      <Avatar :src="user?.avatar" size="36" />
      <Text
        :label="getUsername(user)"
        :caption="user.email"
      />
    </template>
    <template #render>
      <Render
        page="admin/users/user"
        :props="{ fields, id: user.id }"
        :skeleton="['h-25 w-25 rounded-full', 'h-22', 'h-33']"
      />
      <Button :click="logout" label="$t:logout" />
    </template>
  </Open>
</template>
