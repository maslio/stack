<script setup lang="ts">
import { readUser } from '@directus/sdk'

const { id } = withDefaults(defineProps<{
  id: string
  fields?: string[]
  delete?: boolean
}>(), {
  fields: () => [
    'name',
    'email',
    'avatar',
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

const { requestAny } = useDirectus()
const { data: user, refresh } = await useAsyncData(() => requestAny(readUser(id, { fields: [
  'id',
  'first_name',
  'last_name',
  'email',
  'avatar',
  'language',
  'appearance',
  { role: ['id', 'name', 'icon'] },
] })) as Promise<User>)

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
      <Avatar :src="user.avatar" size="100" />
    </div>
    <Card>
      <Open
        v-if="fields.includes('avatar')"
        icon="material-symbols:add-a-photo"
        label="$t:change_avatar"
        page="admin/users/edit/avatar"
        :props="{ user, onSave }"
      />
      <Open
        v-if="fields.includes('password')"
        icon="material-symbols:passkey"
        label="$t:change_password"
        page="admin/users/edit/password"
        :props="{ user, onSave }"
      />
    </Card>
    <Card>
      <Open
        v-if="fields.includes('name')"
        label="$t:user_name"
        :value="getUsername(user)"
        page="admin/users/edit/name"
        :props="{ user, onSave }"
        skeleton="h-28 h-10"
        @close="refresh"
      />
      <Open
        v-if="fields.includes('email')"
        label="$t:email"
        :value="user.email ?? ''"
        page="admin/users/edit/email"
        :props="{ user, onSave }"
      />
      <Open
        v-if="fields.includes('role')"
        label="$t:role"
        :value="user.role?.name"
        page="admin/users/edit/role"
        :props="{ user, onSave }"
      />
      <Open
        v-if="fields.includes('language')"
        label="$t:role"
        :value="user.role?.name"
        page="admin/users/edit/language"
        :props="{ user, onSave }"
      />
      <Open
        v-if="fields.includes('appearance')"
        label="$t:language"
        :value="$t(`language.${user.language ?? 'en-US'}`)"
        page="admin/users/edit/appearance"
        :props="{ user, onSave }"
      />
    </Card>
    <Open
      v-if="$props.delete"
      label="$t:delete_user"
      page="admin/users/edit/delete"
      target="dialog-bottom"
      :props="{ user, onDelete }"
    />
  </template>
</template>
