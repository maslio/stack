<script setup lang="ts">
import Edit from './edit.vue'
import type { Language, Translation } from './types'

const { languages } = defineProps<{
  languages: Language[]
}>()
const emit = defineEmits<{
  save: []
}>()

const translation: Translation = {
  key: '',
  values: languages.map(l => ({
    language: l.code,
    value: '',
  })),
}
const key = ref('')
watch(key, () => {
  translation.key = key.value
})
</script>

<template>
  <InputString
    v-model="key"
    label="Key"
    class="font-mono"
  />
  <Edit
    :translation="translation"
    :languages="languages"
    @save="emit('save')"
  />
</template>
