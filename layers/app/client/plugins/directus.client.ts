import { authentication, createDirectus, rest } from '@directus/sdk'

export default defineNuxtPlugin((nuxtApp) => {
  const url = `${location.protocol}//${location.host}/api/db`

  const client = createDirectus(url)
    .with(rest({ credentials: 'include' }))
    .with(authentication('session', { credentials: 'include' }))

  nuxtApp.provide('directus', client)
})
