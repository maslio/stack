<script setup lang="ts">
import { readCollections } from '@directus/sdk'
import type { Collection } from '@directus/types'
import { titleCase } from 'scule'

const { request } = useDirectus()

const { data } = await useAsyncData('directus.collections', async () => {
  const collections = await request<Collection[]>(readCollections())
  return collections.filter(c => !c.collection.startsWith('directus_'))
})
const search = ref('')
const items = computed(() => {
  return data.value?.filter(c => c.collection.includes(search.value))
})
</script>

<template>
  <List
    v-model:search="search"
    :items
    item-key="collection"
    v-slot="{ item }"
  >
    <Open
      :label="titleCase(item.collection)"
      page="directus/collections/collection"
      :props="{ name: item.collection }"
    >
      <div class="font-mono">
        {{ item.collection }}
      </div>
    </Open>
  </List>
</template>
