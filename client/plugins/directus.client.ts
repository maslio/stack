import { authentication, createDirectus, realtime, rest, staticToken } from '@directus/sdk'
import { defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin((nuxtApp) => {
  const url = `${location.protocol}//${location.host}/_db`

  const client = createDirectus<DirectusSchema>(url)
    .with(rest({ credentials: 'include' }))
    .with(authentication('session', { credentials: 'include' }))
    .with(realtime())

  nuxtApp.provide('directus', client)
})
