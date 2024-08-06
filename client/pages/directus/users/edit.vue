<script setup lang="ts">
import { readItems, readUser } from '@directus/sdk'

const { id } = withDefaults(defineProps<{
  id: string
  fields?: string[]
  delete?: boolean
}>(), {
  fields: () => [
    'name',
    'email',
    'avatar',
    'role',
    'password',
    'language',
    'appearance',
  ],
})
const emit = defineEmits<{
  save: [id: string]
  delete: [id: string]
}>()
interface User {
  id: string
  first_name: string
  last_name: string
  email: string
  avatar: string
  language: string
  appearance: string
  role: {
    id: string
    name: string
    icon: string
  }
}

const { request } = useDirectus()
const { data: user, refresh } = await useAsyncData(() => request(readUser(id, { fields: [
  'id',
  'first_name',
  'last_name',
  'email',
  'avatar',
  'language',
  'appearance',
  { role: ['id', 'name', 'icon'] },
] })) as Promise<User>)

const languages = await request(readItems('languages'))
function getLanguageName(language: string): string {
  return languages.find(l => l.code === language)?.name ?? ''
}

function onSave() {
  // next.value?.close()
  refresh()
  emit('save', id)
}
function onDelete() {
  // bottom.value?.close()
  emit('delete', id)
}
</script>

<template>
  <template v-if="user">
    <div flex items-center justify-center>
      <Avatar size="100" :src="user.avatar" />
    </div>
    <Card>
      <Open
        v-if="fields.includes('avatar')"
        icon="material-symbols:add-a-photo"
        label="$t:change_avatar"
        page="directus/users/edit/avatar"
        :props="{ user, onSave }"
      />
      <Open
        v-if="fields.includes('password')"
        icon="material-symbols:passkey"
        label="$t:change_password"
        page="directus/users/edit/password"
        skeleton="h-14 h-10"
        :props="{ user, onSave }"
      />
    </Card>
    <Card>
      <Open
        v-if="fields.includes('name')"
        label="$t:user.name"
        page="directus/users/edit/name"
        skeleton="h-28 h-10"
        :props="{ user, onSave }"
        :value="getUsername(user)"
        @close="refresh"
      />
      <Open
        v-if="fields.includes('email')"
        label="$t:email"
        page="directus/users/edit/email"
        skeleton="h-14 h-10"
        :props="{ user, onSave }"
        :value="user.email ?? ''"
      />
      <Open
        v-if="fields.includes('role')"
        label="$t:user.role"
        page="directus/users/edit/role"
        :props="{ user, onSave }"
        :value="user.role?.name"
      />
      <Open
        v-if="fields.includes('language')"
        label="$t:language"
        page="directus/users/edit/language"
        :props="{ user, onSave }"
        :value="getLanguageName(user.language ?? 'en-US')"
      />
      <Open
        v-if="fields.includes('appearance')"
        label="$t:appearance"
        page="directus/users/edit/appearance"
        :props="{ user, onSave }"
        :value="`$t:appearance.${user.appearance ?? 'auto'}`"
      />
    </Card>
    <Open
      v-if="$props.delete"
      label="$t:delete_user"
      page="directus/users/edit/delete"
      target="dialog-bottom"
      :props="{ user, onDelete }"
    />
  </template>
</template>
