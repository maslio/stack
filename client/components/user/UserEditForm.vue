<script setup lang="ts">
import { updateUser } from '@directus/sdk'
import type { User } from '@directus/types'
import { pick } from 'lodash-es'

interface Field {
  field: string
  [key: string]: any
}

const { user, fields } = defineProps<{
  user: User
  fields: Field[]
}>()
const emit = defineEmits<{
  save: []
}>()

const { requestAny, user: me, refreshUser } = useDirectus()

async function save(data: Record<string, any>) {
  await requestAny(updateUser(user.id, data))
  emit('save')
  if (me.value?.id === user.id)
    refreshUser()
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
