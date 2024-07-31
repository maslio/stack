<script setup lang="ts">
import type { Language, Translation, TranslationValue } from './types'
import { useTranslation } from '~/composables/useTranslation'

const props = defineProps<{
  language: string
  languages: Language[]
  translation: Translation
}>()
const { toEnglish } = useTranslation()
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
</script>

<template>
  <InputText
    v-model="model"
    :label="label"
    :placeholder
  />
</template>
