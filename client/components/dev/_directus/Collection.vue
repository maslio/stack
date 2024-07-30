<script setup lang="ts">
import Items from './Items.vue'

const { name } = defineProps<{
  name: string
}>()

const next = openRef()
const { readFields, countItems, readCollection } = useCollection(name)
const fields = await readFields()
const count = await countItems()
const collection = await readCollection(name)
</script>

<template>
  <Card>
    <Item
      icon="material-symbols:list"
      label="Items"
      :value="String(count)"
      :open="{
        ref: next,
        component: Items,
        props: { collection, fields },
      }"
    />
  </Card>
  <Open ref="next" />
</template>
