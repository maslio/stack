import { upperFirst } from 'scule'

type Translations = Map<string, string>
type Data = Map<string, Ref<Translations>>

export default defineNuxtPlugin(async () => {
  const config = useRuntimeConfig()
  const lang = useCookie('language', {
    default: () => config.public.language,
  })
  const user = useState<AuthUser>('user')
  if (user.value && user.value.language)
    lang.value = user.value.language

  const language = ref(lang.value)
  const data = useState('translations', () => new Map()) as Ref<Data>
  const untranslated = ref(new Set<string>())

  async function fetchTranslations(lang: string = language.value) {
    const _translations = await $fetch(`/api/translate/translations/${lang}`)
    const translations = ref(new Map(Object.entries(_translations))) as Ref<Translations>
    data.value.set(lang, translations)
    return translations
  }

  const translations = computed(() => {
    const translations = data.value.get(language.value)
    if (!translations)
      return new Map()
    return translations.value
  })

  function toEnglish(key: string) {
    return upperFirst(key.replace(/_/g, ' ').replace(/.+\./g, ''))
  }

  function translate(key: string) {
    if (!key)
      return ''
    if (translations.value?.has(key))
      return translations.value?.get(key) as string
    untranslated.value.add(key)
    return toEnglish(key)
  }
  function maybeTranslate(key?: string) {
    if (!key)
      return ''
    if (typeof key !== 'string')
      return String(key)
    if (key.startsWith('$t:'))
      return translate(key.substring(3))
    return key
  }

  await callOnce(async () => await fetchTranslations())
  return {
    provide: {
      language,
      translations,
      untranslated,
      fetchTranslations,
      t: translate,
      mt: maybeTranslate,
    },
  }
})
