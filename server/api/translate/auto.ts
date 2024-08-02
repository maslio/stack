import type { Translation } from '../../../client/pages/admin/translate/types'

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    language: string
    translation: Translation
  }>(event)

  const message: string[] = []
  message.push(`key: ${body.translation.key}`)
  for (const value of body.translation.values) {
    if (value.value.trim().length)
      message.push(`translation for ${value.language}: ${value.value}`)
  }
  const system = `I need to get a translation for ${body.language}. Answer with only the translation.`

  const { model, generateText } = useOpenai()

  const { text } = await generateText({
    model: model('gpt-4o-mini'),
    system,
    messages: [{ role: 'user', content: message.join('\n') }],
  })
  return text
})
