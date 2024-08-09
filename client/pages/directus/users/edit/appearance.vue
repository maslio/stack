<script setup lang="ts">
import { updateUser } from '@directus/sdk'

const { user } = defineProps<{
  user: {
    id: string
    appearance: 'auto' | 'dark' | 'light' | null
    [key: string]: any
  }
}>()
const emit = defineEmits<{
  save: []
}>()

const { $appearance } = useNuxtApp()

const model = ref(user.appearance ?? 'auto')
const options = ['auto', 'dark', 'light'].map(value => ({
  value,
  label: `$t:appearance.${value}`,
}))
const { request, user: me } = useDirectus()
async function save() {
  await request(updateUser(user.id, { appearance: model.value }))
  if (me.value?.id === user.id)
    $appearance.value = model.value
  emit('save')
}
</script>

<template>
  <List :items="options" item-key="value">
    <template #item="{ item: option }">
      <Option
        v-model="model"
        :value="option.value"
        :label="option.label"
      />
    </template>
  </List>
  <Button
    color="primary"
    :click="save"
    label="$t:save"
  />
</template>
