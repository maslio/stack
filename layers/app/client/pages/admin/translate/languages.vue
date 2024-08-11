<script setup lang="ts">
import { createItem, deleteItems, readItems, updateItem } from '@directus/sdk'

const { request } = useDirectus()
const { data: languages, refresh } = useAsyncData(async () => await request(readItems('languages')))

const openEdit = ref()
const openAdd = ref()

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
async function deleteLanguage(code: string) {
  await request(deleteItems('languages', [code]))
  refresh()
  openEdit.value?.close()
}
</script>

<template>
  <List :items="languages">
    <template #item="{ item }">
      <Open
        ref="openEdit"
        :label="item.name"
        :value="item.code"
      >
        <template #render>
          <Form
            collection="languages"
            :groups="[
              { fields: ['code', 'name'] },
              { fields: ['direction'] },
            ]"
            :values="item"
            :submit="updateLanguage"
          />
          <Button label="Delete" @click="deleteLanguage(item.code)" />
        </template>
      </Open>
    </template>
  </List>

  <Open
    ref="openAdd"
    icon="material-symbols:add"
    label="Add language"
  >
    <template #render>
      <Form
        collection="languages"
        :groups="[
          { fields: ['code', 'name'] },
          { fields: ['direction'] },
        ]"
        :values="{ direction: 'ltr' }"
        :submit="createLanguage"
      />
    </template>
  </Open>
</template>
