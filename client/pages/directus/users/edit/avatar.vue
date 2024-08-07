<script setup lang="ts">
import type { File, User } from '@directus/types'
import { updateUser } from '@directus/sdk'

const { user } = defineProps<{
  user: User
}>()
const emit = defineEmits<{
  save: []
}>()

const newAvatar = ref<File>()
const { request, user: me, refreshUser } = useDirectus()
function uploadAvatar(files: File[]) {
  newAvatar.value = files[0]
}
async function saveAvatar() {
  // @ts-expect-error directus user avatar
  await request(updateUser(user.id, { avatar: newAvatar.value }))
  newAvatar.value = undefined
  emit('save')
  if (me.value?.id === user.id)
    refreshUser()
}
</script>

<template>
  <FilesUpload @upload="uploadAvatar" />
  <Button
    v-if="newAvatar"
    color="primary"
    label="save"
    :click="saveAvatar"
  />
</template>
