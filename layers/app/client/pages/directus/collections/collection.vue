<script setup lang="ts">
import { readCollection, readFieldsByCollection } from '@directus/sdk'
import type { Collection, Field } from '@directus/types'

const { name } = defineProps<{ name: string }>()
const { request } = useDirectus()
const collection = await request<Collection>(readCollection(name))
const fields = await request<Field[]>(readFieldsByCollection(name))
const key = fields[0]?.field ?? 'id'

const { countItems } = useCollection(name)
const { data: count } = useAsyncData(`directus.collection.${name}.count`, async () => {
  return countItems({}, key)
})

const options = [{
  label: 'Push items',
  route: `api/directus/collections/${name}/push`,
}, {
  label: 'Pull items',
  route: `api/directus/collections/${name}/pull`,
}]
</script>

<template>
  <Card>
    <Open
      label="Items"
      :value="String(count)"
      page="directus/collections/items"
      :props="{ collection, fields }"
    />
  </Card>
  <Api :options />
</template>
