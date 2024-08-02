<script setup lang="ts">
import { readItems, readTranslations } from '@directus/sdk'
import type { Language, Translation } from './types'

const { request } = useDirectus()
const language = ref(useNuxtApp().$language)

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
const layout = useLayout()
const items = computed(() => {
  const items = translations.value?.filter(t => t.key.includes(search.value)) ?? []
  if (items.length === 0) {
    items.push({
      key: search.value,
      new: true,
      values: languages.value?.map(l => ({
        language: l.code,
        value: '',
      })) ?? [],
    })
  }
  return items
})
function onSave() {
  layout.close('next')
  refresh()
}
</script>

<template>
  <Card>
    <InputSelect
      v-model="language"
      icon="material-symbols:language"
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
        <Open
          icon="material-symbols:box-edit"
          label="Edit languages"
          page="admin/translate/languages"
        />
      </template>
    </InputSelect>
  </Card>

  <List
    v-model:search="search"
    :items
  >
    <template #default="{ item: translation }">
      <Open
        label="Edit translation"
        page="admin/translate/edit"
        :props="{ translation, languages, onSave }"
      >
        <Icon
          v-if="translation.new"
          name="material-symbols:add"
        />
        <div class="flex-1 font-mono">
          {{ translation.key }}
        </div>
        <div class="text-faint">
          {{ translation.values.find(v => v.language === language)?.value }}
        </div>
      </Open>
    </template>
  </List>
</template>
