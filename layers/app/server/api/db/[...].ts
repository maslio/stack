import { joinURL } from 'ufo'

export default defineEventHandler(async (event) => {
  const proxyUrl = useRuntimeConfig().directusUrl as string
  const path = event.path.replace(/^\/api\/db\//, '')
  const target = joinURL(proxyUrl, path)
  return proxyRequest(event, target)
})
