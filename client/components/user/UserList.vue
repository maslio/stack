<script setup lang="ts">
defineProps<{
  create?: boolean
}>()

const { request } = useDirectus()
const data = useAsyncData('user.list', async () => {
  const users = await request(readUsers({ fields: [
    'id',
    'avatar',
    'email',
    'first_name',
    'last_name',
  ] }))
  return users
})
const edit = openRef()
const create = openRef()
</script>

<template>
  <List
    v-slot="{ item: user }"
    item-key="id"
    :data
  >
    <Item
      :open="{
        ref: edit,
        label: getUsername(user),
        props: { id: user.id },
      }"
    >
      <UserAvatar :user size="30" />
      <Text
        :label="getUsername(user)"
        :caption="user.email ?? ''"
      />
    </Item>
  </List>

  <Item
    icon="material-symbols:add"
    label="$t:create_a_user"
    :open="{ ref: create }"
  />

  <Open ref="edit" v-slot="{ props }">
    <UserEdit
      :id="props.id"
      @save="data.refresh()"
      @delete="data.refresh(); edit?.close()"
    />
  </Open>
  <Open ref="create" label="$t:create_a_user">
    <UserCreate @save="data.refresh(); create?.close()" />
  </Open>
</template>
