<script setup lang="ts">
const mode = ref<'push' | 'pull'>()

const iconPush = 'material-symbols:upload'
const iconPull = 'material-symbols:download'

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
  <Card>
    <Option
      v-model="mode" label="Push" value="push"
      icon="material-symbols:upload"
    />
    <Option
      v-model="mode" label="Pull" value="pull"
      icon="material-symbols:download"
    />
  </Card>
  <template v-if="mode">
    <Button
      color="primary"
      :click="sync"
      :icon="mode === 'push' ? iconPush : iconPull"
    />
  </template>
</template>
