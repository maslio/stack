<script setup lang="ts">
import type { Collection, Field } from '@directus/types'
import DisplayTemplate from './DisplayTemplate.vue'

const { collection, fields } = defineProps<{
  collection: Collection
  fields: Field[]
}>()

const displayTemplate = collection.meta?.display_template as string

// const { readItems } = useCollection(collection.collection)
const { items } = await useItems(collection.collection)
</script>

<template>
  <List
    :items
    v-slot="{ item }"
  >
    <Item>
      <DisplayTemplate
        :item
        :fields
        :pattern="displayTemplate"
      />
    </Item>
  </List>
</template>
