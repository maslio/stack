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
    'language',
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
      <div class="flex gap-3">
        <Avatar :src="user?.avatar" size="36" />
        <Text
          :label="getUsername(user)"
          :caption="user.email"
        />
      </div>
    </template>
    <template #render>
      <Render
        page="directus/users/edit"
        :props="{ fields, id: user.id }"
        :skeleton="['h-25 w-25 rounded-full', 'h-22', 'h-33']"
      />
      <Button :click="logout" label="$t:logout" />
    </template>
  </Open>
</template>
