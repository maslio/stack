<script setup lang="ts">
const tabs = [
  { label: 'Push', value: 'push' },
  { label: 'Pull', value: 'pull' },
]
const mode = ref<'push' | 'pull'>()
const icon = computed(() => mode.value === 'push'
  ? 'material-symbols:upload'
  : 'material-symbols:download')

async function sync() {
  await $fetch('api/directus/sync/schema', {
    method: 'POST',
    body: {
      mode: mode.value,
    },
  })
}
</script>

<template>
  <Tabs v-model="mode" :tabs />
  <template v-if="mode">
    <Button
      color="primary"
      :click="sync"
      :icon
    />
  </template>
</template>
