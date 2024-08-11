<script setup lang="ts">
import { updateUser } from '@directus/sdk'
import type { User } from '@directus/types'
import { pick } from 'lodash-es'

const { user } = defineProps<{
  user: User
}>()
const emit = defineEmits<{
  save: []
}>()

const { close } = useLayout()
const { $t } = useNuxtApp()
const { requestAny, user: me, refreshUser } = useDirectus()

const fields = [
  { field: 'first_name', label: $t('first_name') },
  { field: 'last_name', label: $t('last_name') },
]

async function save(data: Record<string, any>) {
  await requestAny(updateUser(user.id, data))
  emit('save')
  if (me.value?.id === user.id)
    refreshUser()
  close()
}
</script>

<template>
  <Form
    collection="directus_users"
    :fields="fields"
    :values="pick(user, fields.map(f => f.field))"
    :submit="save"
  />
</template>
