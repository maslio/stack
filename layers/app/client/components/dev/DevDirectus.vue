<script setup lang="ts">
import { titleCase } from 'scule'
import type { Collection as DirectusCollection } from '@directus/types'
import { readCollections } from '@directus/sdk'
import Collection from './_directus/Collection.vue'

const tabs = [
  { label: 'System', value: 'system' },
  { label: 'Custom', value: 'custom' },
]
const tab = ref('custom')
const next = ref<OpenRef>()

const { request } = useDirectus()
const _collections = await request<DirectusCollection[]>(readCollections())
const collections = computed(() => {
  return tab.value === 'system'
    ? _collections.filter(c => c.collection.startsWith('directus_'))
    : _collections.filter(c => !c.collection.startsWith('directus_'))
})
</script>

<template>
  <Card>
    <Tabs v-model="tab" :tabs />
    <List
      :items="collections"
      v-slot="{ item }"
    >
      <Item
        :label="titleCase(item.collection)"
        :open="{
          ref: next,
          component: Collection,
          props: {
            name: item.collection,
          },
        }"
      />
    </List>
  </Card>
  <Open ref="next" />
</template>
