<script setup lang="ts">
import { upperFirst } from 'scule'
import type { Language, Translation, TranslationValue } from './types'

const props = defineProps<{
  language: string
  languages: Language[]
  translation: Translation
}>()
function toEnglish(key: string) {
  return upperFirst(key.replace(/_/g, ' ').replace(/.+\./g, ''))
}
const placeholder = computed(() => toEnglish(props.translation.key))
const translationValue = computed(() => props.translation.values.find(
  translation => translation.language === props.language,
)) as ComputedRef<TranslationValue>

const model = ref(translationValue.value?.value ?? '')
watch(model, (value) => {
  translationValue.value.value = value
})

const label = computed(() => props.languages.find(
  language => language.code === props.language,
)?.name)

async function autoTranslate() {
  const text = await $fetch(`/api/translate/generate`, {
    method: 'POST',
    body: {
      language: props.language,
      translation: {
        key: props.translation.key,
        values: props.translation.values.map(v => ({
          language: v.language,
          value: v.language === 'en-US' && v.value.trim() === ''
            ? toEnglish(props.translation.key)
            : v.value,
        })),
      },
    },
  })
  model.value = upperFirst(text)
}
</script>

<template>
  <div class="flex items-center">
    <InputText
      v-model="model"
      :label="label"
      :placeholder
      class="flex-1"
    >
      <Button icon="material-symbols:refresh" icon-size="20" :click="autoTranslate" />
    </InputText>
  </div>
</template>
