<script setup lang="ts">
import { updateUser } from '@directus/sdk'

const { user } = defineProps<{
  user: Record<string, any>
}>()
const emit = defineEmits<{
  save: []
}>()

const password = ref('')
const { request } = useDirectus()

async function click() {
  await request(updateUser(user.id, { password: password.value }))
  emit('save')
}
</script>

<template>
  <InputPassword
    v-model="password"
    label="$t:new_password"
    autocomplete="new-password"
  />
  <Button
    color="primary"
    label="$t:save"
    :click
  />
</template>
