import { readTranslations } from '@directus/sdk'

export default defineLazyEventHandler(() => {
  const { request } = useDirectus('admin')

  async function getTranslations(language: string) {
    const translations = await request(readTranslations({
      fields: ['key', 'value'],
      filter: { language },
    }))
    return Object.fromEntries(translations.map(t => [t.key, t.value]))
  }

  return defineEventHandler(async (event) => {
    const language = getRouterParam(event, 'language')
    if (!language)
      throw createError({ status: 400, message: 'Language is required' })

    return await getTranslations(language)
  })
})
