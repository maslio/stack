<script setup lang="ts">
import type { File, User } from '@directus/types'

const { user } = defineProps<{
  user: User
}>()
const emit = defineEmits<{
  save: []
}>()

const newAvatar = ref<File>()
const { requestAny, user: me, refreshUser } = useDirectus()
function uploadAvatar(files: File[]) {
  newAvatar.value = files[0]
}
async function saveAvatar() {
  // @ts-expect-error directus user avatar
  await requestAny(updateUser(user.id, { avatar: newAvatar.value }))
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
