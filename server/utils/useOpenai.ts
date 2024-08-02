import { createOpenAI } from '@ai-sdk/openai'
import { generateObject, generateText, tool } from 'ai'

export function useOpenai() {
  const { openaiApiKey } = useRuntimeConfig()
  if (!openaiApiKey)
    throw new Error('Missing OpenAI API key')
  const model = createOpenAI({ apiKey: openaiApiKey as string })

  return {
    model,
    tool,
    generateText,
    generateObject,
  }
}
