<script setup lang="ts">
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
    <slot />
  </Layout>
</template>
