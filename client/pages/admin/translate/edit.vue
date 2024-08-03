<script setup lang="ts">
import { createTranslation, deleteTranslations, updateTranslation } from '@directus/sdk'
import type { Language, Translation, TranslationValue } from './types'
import Value from './value.vue'

const props = defineProps<{
  translation: Translation
  languages: Language[]
}>()

const emit = defineEmits<{
  save: []
}>()
const { request } = useDirectus()
const { $fetchTranslations, $untranslated } = useNuxtApp()

async function saveOne(key: string, data: TranslationValue) {
  const value = data.value.trim()
  const language = data.language
  const shouldBeEmpty = value === ''
  if (shouldBeEmpty && data.id)
    await request(deleteTranslations([data.id]))
  else if (data.id)
    await request(updateTranslation(data.id, { value }))
  else if (!shouldBeEmpty)
    await request(createTranslation({ key, language, value }))
}

async function deleteOne(id: string) {
  await request(deleteTranslations([id]))
}

async function save() {
  const { key, values } = props.translation
  for (const value of values)
    await saveOne(key, value)

  await $fetchTranslations()
  $untranslated.value.delete(key)
  emit('save')
}

async function clear() {
  const { values } = props.translation
  for (const value of values) {
    if (value.id)
      await deleteOne(value.id)
  }
  await $fetchTranslations()
  emit('save')
}
</script>

<template>
  <List :items="translation.values" v-slot="{ item }">
    <Value
      :languages="languages"
      :translation="translation"
      :language="item.language"
    />
  </List>

  <Button label="$t:save" color="primary" :click="save" />
  <Button label="$t:delete" color="default" :click="clear" />
</template>
