<script setup lang="ts">
import { readItems, readTranslations } from '@directus/sdk'
import type { Language, Translation } from './types'

const { request } = useDirectus()
const { $language, $untranslated } = useNuxtApp()
const language = $language

const { data: languages } = await useAsyncData<Language[]>(async () =>
  await request<Language[]>(readItems('languages')))

function createTranslation(key: string, create = false): Translation {
  const translation: Translation = {
    key,
    create,
    values: languages.value?.map(l => ({
      language: l.code,
      value: '',
    })) ?? [],
  }
  return translation
}

const { data: translations, refresh } = await useAsyncData<Translation[]>(async () => {
  const translations: Translation[] = []
  const _translations = await request(readTranslations({ sort: ['key'] }))
  for (const t of _translations) {
    let translation = translations.find(i => i.key === t.key)
    if (!translation) {
      translation = createTranslation(t.key)
      translations.push(translation)
    }
    const value = translation.values.find(v => v.language === t.language)
    if (value) {
      value.id = t.id
      value.value = t.value
    }
  }
  return translations
})

const search = ref('')
const layout = useLayout()
const items = computed(() => {
  const items: Translation[] = []
  if (search.value) {
    const _items = translations.value?.filter(t => t.key.includes(search.value)) ?? []
    if (_items.length === 0)
      items.push(createTranslation(search.value, true))
    else
      items.push(..._items)
  }
  else {
    for (const key of $untranslated.value)
      items.push(createTranslation(key, true))
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
    <Open
      label="User Language"
      page="admin/users/edit/language"
      :value="language"
      :props="{ user: { id: $user.value?.id, language: $language } }"
    />
    <Open
      label="Manage languages"
      page="admin/translate/languages"
    />
  </Card>

  <List
    v-model:search="search"
    :items
    item-key="key"
  >
    <template #default="{ item: translation }">
      <Open
        :label="translation.key"
        page="admin/translate/edit"
        :props="{ translation, languages, onSave }"
      >
        <Icon
          v-if="translation.create"
          name="material-symbols:add"
        />
        <div class="flex-1 font-mono">
          {{ translation.key }}
        </div>
        <div class="truncate text-faint">
          {{ translation.values.find(v => v.language === language)?.value }}
        </div>
      </Open>
    </template>
  </List>
</template>
