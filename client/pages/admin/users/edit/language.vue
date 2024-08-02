<script setup lang="ts">
import { readItems, updateUser } from '@directus/sdk'

interface User {
  id: string
  language: string | null
  [key: string]: any
}

const { user } = defineProps<{
  user: User
}>()
const emit = defineEmits<{
  save: []
}>()

const { request, user: me } = useDirectus()
const langauge = ref(user.language ?? 'en-US')
const languages = await request(readItems('languages'))
const options = languages.map(l => ({
  value: l.code,
  label: l.name,
}))
async function save() {
  await request(updateUser(user.id, { language: langauge.value }))
  if (me.value?.id === user.id)
    window.location.reload()
  else
    emit('save')
}
</script>

<template>
  <Select v-model="langauge" :options />
  <Button
    color="primary"
    :click="save"
    label="$t:save"
  />
</template>
