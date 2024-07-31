import { upperFirst } from 'scule'

export function useTranslation(language?: string) {
  language ??= useNuxtApp().$language

  function toEnglish(key: string) {
    return upperFirst(key.replace(/_/g, ' ').replace(/.+\./g, ''))
  }

  const translations = new Map()
  function translate(key: string) {
    if (!key)
      return ''
    if (translations.has(key))
      return translations.get(key) as string
    return toEnglish(key)
  }
  function maybeTranslate(key?: string) {
    if (!key)
      return ''
    if (key.startsWith('$t:'))
      return translate(key.substring(3))
    return key
  }

  return {
    toEnglish,
    translate,
    maybeTranslate,
  }
}
