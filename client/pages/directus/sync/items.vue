<script setup lang="ts">
import { readCollections } from '@directus/sdk'
import type { Collection } from '@directus/types'

const { request } = useDirectus()
const _collections = await request<Collection[]>(readCollections())
const options = reactive<{
  label: string
  value: string
  status: null | 'success' | 'error' | 'syncing'
}[]>(_collections
  .filter(collection => !collection.collection.startsWith('directus'))
  .map(collection => ({
    label: collection.collection,
    value: collection.collection,
    status: null,
  })),
)

const selected = ref<string[]>([])
const mode = ref<'push' | 'pull'>()
const clear = ref(false)

const icon = computed(() => mode.value === 'push'
  ? 'material-symbols:upload'
  : 'material-symbols:download')

const syncing = ref(false)
async function sync() {
  syncing.value = true
  for (const collection of selected.value) {
    const option = options.find(o => o.value === collection)
    if (!option)
      continue
    option.status = 'syncing'
    try {
      await $fetch('api/directus/sync/items', {
        method: 'POST',
        body: {
          mode: mode.value,
          collection,
          clear: clear.value,
        },
      })
      option.status = 'success'
    }
    catch (error) {
      option.status = 'error'
      console.error(error)
      break
    }
  }
  mode.value = undefined
  selected.value = []
  clear.value = false
  syncing.value = false
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
  <Card>
    <InputToggle
      v-model="clear"
      icon="material-symbols:delete"
      label="Delete existing items"
    />
  </Card>
  <List :items="options">
    <template #item="{ item }">
      <Option
        v-model="selected"
        multiple
        :label="item.label"
        :value="item.value"
      >
        <div class="flex items-center justify-between gap-3">
          <div class="font-mono">
            {{ item.label }}
          </div>
          <div v-if="item.status" class="h-5 flex items-center">
            <Spinner v-if="item.status === 'syncing'" />
            <Icon
              v-else
              :class="item.status === 'success' ? 'text-positive' : 'text-negative'"
              :name="item.status === 'success' ? 'material-symbols:check-circle' : 'material-symbols:error'"
            />
          </div>
        </div>
      </Option>
    </template>
  </List>
  <Button
    color="primary"
    :click="sync"
    :disabled="!mode || !selected.length"
    :icon
  />
</template>
