<script setup lang="ts">
import type { User } from '@directus/types'
import EditAvatar from './UserEditAvatar.vue'
import EditForm from './UserEditForm.vue'
import EditName from './UserEditName.vue'
import EditPassword from './UserEditPassword.vue'
import EditRole from './UserEditRole.vue'
import EditLanguage from './UserEditLanguage.vue'
import UserEditDelete from './UserEditDelete.vue'

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

const { requestAny } = useDirectus()
const { data: user, refresh } = await useAsyncData(() => {
  return requestAny(readUser(id, { fields: [
    'id',
    'first_name',
    'last_name',
    'email',
    'avatar',
    'language',
    'appearance',
    { role: ['id', 'name', 'icon'] },
  ] })) as Promise<User>
})
const next = openRef()
const bottom = openRef()

function onSave() {
  next.value?.close()
  refresh()
  emit('save', id)
}
function onDelete() {
  bottom.value?.close()
  emit('delete', id)
}
</script>

<template>
  <Open ref="next" />
  <Open ref="bottom" target="bottom" />

  <template v-if="user">
    <div flex items-center justify-center>
      <UserAvatar :user size="100" />
    </div>
    <Card>
      <Item
        v-if="fields.includes('avatar')"
        icon="material-symbols:add-a-photo"
        label="$t:change_avatar"
        :open="{
          ref: next,
          component: EditAvatar,
          props: { user, onSave },
        }"
      />
      <Item
        v-if="fields.includes('password')"
        icon="material-symbols:passkey"
        label="$t:change_password"
        :open="{
          ref: next,
          component: EditPassword,
          props: { user, onSave },
        }"
      />
    </Card>
    <Card>
      <Item
        v-if="fields.includes('name')"
        label="$t:user_name"
        :value="getUsername(user)"
        :open="{
          ref: next,
          component: EditName,
          props: { user, onSave },
        }"
      />
      <Item
        v-if="fields.includes('email')"
        label="$t:email"
        :value="user.email ?? ''"
        :open="{
          ref: next,
          component: EditForm,
          props: {
            user,
            onSave,
            fields: [{ field: 'email' }],
          },
        }"
      />
      <Item
        v-if="fields.includes('role')"
        label="$t:role"
        :value="user.role?.name"
        :open="{
          ref: next,
          component: EditRole,
          props: { user, onSave },
        }"
      />
      <Item
        v-if="fields.includes('language')"
        label="$t:language"
        :value="$t(`lang_${user.language ?? 'en-US'}`)"
        :open="{
          ref: next,
          component: EditLanguage,
          props: { user, onSave },
        }"
      />
    </Card>

    <Item
      v-if="$props.delete"
      :open="{
        ref: bottom,
        component: UserEditDelete,
        props: { user, onDelete },
      }"
    >
      <Icon class="text-negative" name="material-symbols:delete-rounded" />
      <Text label="$t:delete_user" />
    </Item>
  </template>
</template>
