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

const { $language, $fetchTranslations } = useNuxtApp()
const { request, user: me } = useDirectus()
const langauge = ref(user.language ?? 'en-US')
const languages = await request(readItems('languages'))
async function save() {
  await request(updateUser(user.id, { language: langauge.value }))
  if (me.value?.id === user.id) {
    await $fetchTranslations(langauge.value)
    $language.value = langauge.value
  }
  else {
    emit('save')
  }
}
</script>

<template>
  <List :items="languages">
    <template #item="{ item: language }">
      <Option
        v-model="langauge"
        :value="language.code"
        :label="language.name"
      />
    </template>
  </List>
  <Button
    color="primary"
    :click="save"
    label="$t:save"
  />
</template>
