<script setup lang="ts">
const me = openRef()
const { user } = useDirectus()
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
      <template #pending>
        <div class="flex flex-col items-center gap-3">
          <Placeholder class="h-100px w-100px rounded-full!" />
          <Placeholder class="h-84px w-full" />
          <Placeholder class="h-126px w-full" />
        </div>
      </template>
    </Open>
    <slot />
  </Layout>
</template>
