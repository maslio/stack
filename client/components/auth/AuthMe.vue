<script setup lang="ts">
import { readMe } from '@directus/sdk'
import type { User } from '@directus/types'

const { requestAny, logout } = useDirectus()
const { data: user } = await useAsyncData(() => {
  return requestAny(readMe()) as Promise<User>
})
</script>

<template>
  <template v-if="user">
    <UserEdit
      :id="user.id"
      :fields="[
        'name',
        'email',
        'avatar',
        'password',
        'langauge',
        'appearance',
      ]"
    />

    <Button :click="logout" label="$t:logout" />
  </template>
</template>
