import { upperFirst } from 'scule'

const translations = new Map<string, string>()

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const language = useCookie('language', {
    default: () => config.public.language,
  })
  const languages = config.public.languages as string
  function translate(key?: string) {
    if (!key)
      return ''
    if (translations.has(key))
      return translations.get(key) as string
    return upperFirst(key.replace(/_/g, ' ').replace(/.+\./g, ''))
  }
  function maybeTranslate(key?: string) {
    if (!key)
      return ''
    if (key.startsWith('$t:'))
      return translate(key.substring(3))
    return key
  }
  return {
    provide: {
      language: language.value,
      languages: languages.split(','),
      t: translate,
      mt: maybeTranslate,
    },
  }
})
