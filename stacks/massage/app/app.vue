<script setup lang="ts">
const dev = import.meta.dev
</script>

<template>
  <AuthLayout>
    <AuthUser />
    <Render v-if="dev && $access('super')" page="dev" />
    <Render v-if="$access('super')" page="super" />
    <Render v-if="$access('admin')" page="admin" />
  </AuthLayout>
</template>
