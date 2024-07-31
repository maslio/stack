<script setup lang="ts">
import { createItem, readItems, updateItem } from '@directus/sdk'

const { request } = useDirectus()
const { data: languages, refresh } = useAsyncData(async () => await request(readItems('languages')))

const openAdd = openRef()
const openEdit = openRef()

async function updateLanguage(data: Record<string, any>) {
  await request(updateItem('languages', data.code, data))
  refresh()
  openEdit.value?.close()
}
async function createLanguage(data: Record<string, any>) {
  await request(createItem('languages', data))
  refresh()
  openAdd.value?.close()
}
</script>

<template>
  <List v-slot="{ item }" :items="languages">
    <Item
      :label="item.name"
      :value="item.code"
      :open="{ ref: openEdit, props: { values: item } }"
    />
  </List>
  <Open ref="openEdit" v-slot="{ props }">
    <Form
      collection="languages"
      :groups="[
        { fields: ['name', 'code'] },
        { fields: ['direction'] },
      ]"
      :values="props.values"
      :submit="updateLanguage"
    />
  </Open>

  <Item
    icon="material-symbols:add"
    label="Add language"
    :open="{ ref: openAdd }"
  />

  <Open ref="openAdd">
    <Form
      collection="languages"
      :groups="[
        { fields: ['name', 'code'] },
        { fields: ['direction'] },
      ]"
      :values="{ direction: 'ltr' }"
      :submit="createLanguage"
    />
  </Open>
</template>
