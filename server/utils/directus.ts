import { Buffer } from 'node:buffer'
import { type AssetsQuery, type DirectusClient, type RestClient, createDirectus, readAssetArrayBuffer, rest, staticToken } from '@directus/sdk'
import { type H3Event, getCookie } from 'h3'
import { jwtDecode } from 'jwt-decode'

type Client = DirectusClient<DirectusSchema> & RestClient<DirectusSchema>
type ClientAny = DirectusClient<any> & RestClient<any>

let clientAdmin: Client
let clientRemote: Client

function adminClient() {
  if (!clientAdmin) {
    const { directusUrl, directusToken } = useRuntimeConfig()
    clientAdmin = createDirectus<DirectusSchema>(directusUrl as string)
      .with(rest())
      .with(staticToken(directusToken as string))
  }
  return clientAdmin
}

function remoteClient() {
  if (!clientRemote) {
    const { remoteDirectusUrl, remoteDirectusToken } = useRuntimeConfig()
    clientRemote = createDirectus<DirectusSchema>(remoteDirectusUrl as string)
      .with(rest())
      .with(staticToken(remoteDirectusToken as string))
  }
  return clientRemote
}

function userClient(event: H3Event) {
  const { directusUrl } = useRuntimeConfig()
  const token = getCookie(event, 'directus_session_token')
  if (!token)
    throw createError({ status: 401 })
  return createDirectus<DirectusSchema>(directusUrl as string)
    .with(rest())
    .with(staticToken(token))
}

export function useDirectus(event: H3Event | 'admin' | 'remote') {
  const client = event === 'admin'
    ? adminClient()
    : event === 'remote'
      ? remoteClient()
      : userClient(event)
  const requestAny: ClientAny['request'] = options => client.request(options)
  const request: Client['request'] = options => client.request(options)
  async function getImage(id: string, query?: AssetsQuery) {
    const arrayBuffer = await request(readAssetArrayBuffer(id, query))
    const buffer = Buffer.from(arrayBuffer)
    return buffer.toString('base64')
  }
  return {
    client,
    request,
    getImage,
    requestAny,
  }
}

interface SessionData {
  id: string
  role: string
  app_access: 1
  admin_access: 1
  session: string
  iat: number
  exp: number
  iss: string
}

export function decodeDirectusToken(token: string) {
  return jwtDecode<SessionData>(token)
}

export function useAccess(...policies: DirectusPolicy[]): void {
  const event = useEvent() as H3Event
  const user = event.context.user
  if (!user)
    throw createError({ status: 401 })
  if (policies.filter(p => user.policies.includes(p)).length === 0)
    throw createError({ status: 403 })
}
