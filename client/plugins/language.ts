export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const language = useCookie('language', {
    default: () => config.public.language,
  })
  const user = useState<AuthUser>('user')
  if (user.value && user.value.language)
    language.value = user.value.language
  const { translate, maybeTranslate } = useTranslation(language.value)
  return {
    provide: {
      language: language.value,
      t: translate,
      mt: maybeTranslate,
    },
  }
})
