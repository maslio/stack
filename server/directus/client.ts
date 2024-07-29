import { type DirectusClient, type RestClient, type WebSocketClient, createDirectus, realtime, rest, staticToken } from '@directus/sdk'
import { type H3Event, getCookie } from 'h3'
import WebSocket from 'ws'

export type Client = DirectusClient<any> & RestClient<any> & WebSocketClient<any>

let clientAdmin: Client
let clientRemote: Client

export function getClient(event: H3Event | 'admin' | 'remote') {
  return event === 'admin'
    ? getAdminClient()
    : event === 'remote'
      ? getRemoteClient()
      : getUserClient(event)
}

function getAdminClient() {
  if (!clientAdmin) {
    const { directusUrl, directusToken } = useRuntimeConfig()
    clientAdmin = createDirectus<DirectusSchema>(directusUrl as string, {
      globals: { WebSocket },
    })
      .with(rest())
      .with(realtime())
      .with(staticToken(directusToken as string))
  }
  return clientAdmin
}

function getRemoteClient() {
  if (!clientRemote) {
    const { remoteDirectusUrl, remoteDirectusToken } = useRuntimeConfig()
    clientRemote = createDirectus<DirectusSchema>(remoteDirectusUrl as string)
      .with(rest())
      .with(realtime())
      .with(staticToken(remoteDirectusToken as string))
  }
  return clientRemote
}

function getUserClient(event: H3Event) {
  const { directusUrl } = useRuntimeConfig()
  const token = getCookie(event, 'directus_session_token')
  if (!token)
    throw createError({ status: 401 })
  return createDirectus<DirectusSchema>(directusUrl as string, {
    globals: { WebSocket },
  })
    .with(rest())
    .with(realtime())
    .with(staticToken(token))
}
