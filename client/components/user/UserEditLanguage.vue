<script setup lang="ts">
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

const { $t, $languages } = useNuxtApp()
const { request, user: me } = useDirectus()
const options = $languages.map(value => ({
  value,
  item: {
    label: $t(`language_${value}`),
  },
}))
const langauge = ref(user.language ?? 'en-US')
async function save() {
  await request(updateUser(user.id, { language: langauge.value }))
  if (me.value?.id === user.id)
    window.location.reload()
  else
    emit('save')
}
</script>

<template>
  <Select
    v-model="langauge"
    :options
  />
  <Button
    color="primary"
    :click="save"
    label="$t:save"
  />
</template>
