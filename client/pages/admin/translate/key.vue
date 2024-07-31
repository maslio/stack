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

async function click() {
  const { key, values } = props.translation
  for (const value of values)
    await saveOne(key, value)
  emit('save')
}
</script>

<template>
  <List v-slot="{ item }" :items="translation.values">
    <Value
      :languages="languages"
      :translation="translation"
      :language="item.language"
    />
  </List>

  <Button label="$t:save" color="primary" :click />
</template>
