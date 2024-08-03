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
      return ref('')
    const string = ref('')
    if (translations.value?.has(key))
      string.value = translations.value?.get(key) as string
    else
      string.value = toEnglish(key)
    return string
  }
  function maybeTranslate(key?: string) {
    if (!key)
      return ref('')
    if (key.startsWith('$t:'))
      return translate(key.substring(3))
    return ref(key)
  }

  await callOnce(async () => await fetchTranslations())
  return {
    provide: {
      language,
      translations,
      fetchTranslations,
      t: translate,
      mt: maybeTranslate,
    },
  }
})
