<script setup lang="ts">
import { readItems, readTranslations } from '@directus/sdk'
import type { Language, Translation } from './types'

const editLangauges = openRef()
const next = openRef()
const { request } = useDirectus()
const language = ref('en-US')

const { data: languages } = await useAsyncData<Language[]>(async () =>
  await request<Language[]>(readItems('languages')))
const { data: translations, refresh } = await useAsyncData<Translation[]>(async () => {
  const translations: Translation[] = []
  const _translations = await request(readTranslations())
  for (const t of _translations) {
    let translation = translations.find(i => i.key === t.key)
    if (!translation) {
      translation = { key: t.key, values: [] }
      translations.push(translation)
    }
    translation.values.push({
      id: t.id,
      language: t.language,
      value: t.value,
    })
  }
  if (languages.value) {
    for (const language of languages.value) {
      for (const t of translations) {
        const value = t.values.find(v => v.language === language.code)
        if (!value)
          t.values.push({ id: null, language: language.code, value: '' })
      }
    }
  }
  return translations
})

const search = ref('')
</script>

<template>
  <InputSelect
    v-model="language"
    label="Language"
    :options="languages"
    option-label="code"
    option-value="code"
  >
    <template #default="{ item }">
      <div class="flex justify-between gap-2">
        <span>{{ item.name }}</span>
        <span class="text-faint">{{ item.code }}</span>
      </div>
    </template>
    <template #append>
      <Item
        icon="material-symbols:box-edit"
        label="Edit languages"
        :open="{ ref: editLangauges, page: 'admin/translate/languages' }"
      />
      <Open ref="editLangauges" />
    </template>
  </InputSelect>

  <List
    v-slot="{ item }"
    v-model:search="search"
    :items="translations"
  >
    <Item
      :open="{
        ref: next,
        label: item.key,
        page: 'admin/translate/key',
        props: {
          translation: item,
          languages,
          onSave: () => {
            refresh()
            next?.close()
          },
        },
      }"
    >
      <div class="flex-1 font-mono">
        {{ item.key }}
      </div>
      <div class="text-faint">
        {{ item.values.find(v => v.language === language)?.value }}
      </div>
    </Item>
  </List>
  <Open ref="next" />
</template>
