<script setup lang="ts">
const me = openRef()
const d = useDirectus()
const user = d.user
</script>

<template>
  <div
    v-if="!user"
    color="back"
    class="fit flex items-center justify-center"
  >
    <AuthSignIn />
  </div>
  <Layout v-else root>
    <Item :open="{ ref: me }">
      <UserAvatar :user="user" size="40" />
      <Text
        :label="`${user.first_name} ${user.last_name}`"
        :caption="user.email"
      />
    </Item>
    <Open ref="me" :label="`${user.first_name} ${user.last_name}`">
      <AuthMe />
    </Open>
    <slot />
  </Layout>
</template>
