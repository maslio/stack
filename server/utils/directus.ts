import { Buffer } from 'node:buffer'
import { type AssetsQuery, readAssetArrayBuffer } from '@directus/sdk'
import { type H3Event, getCookie } from 'h3'
import { type Client, getClient } from '../directus/client'
import { hasAccess } from '../directus/auth'
import type { SubscribeOptions } from '../directus/subscription'
import { createSubscription } from '../directus/subscription'

export function useDirectus(event: H3Event | 'admin' | 'remote') {
  const client = getClient(event)
  const request: Client['request'] = options => client.request(options)
  const requestAny: Client['request'] = options => client.request(options)
  async function getImage(id: string, query?: AssetsQuery) {
    const arrayBuffer = await request(readAssetArrayBuffer(id, query))
    const buffer = Buffer.from(arrayBuffer)
    return buffer.toString('base64')
  }
  let connected = false
  async function connect() {
    if (connected)
      return
    connected = true
    await client.connect()
  }

  async function subscribe(collection: keyof DirectusSchema, options: SubscribeOptions = {}) {
    await connect()
    return createSubscription(client, collection, options)
  }
  return {
    client,
    request,
    requestAny,
    connect,
    subscribe,
    getImage,
  }
}

export function useAccess(...policies: DirectusPolicy[]): void {
  const event = useEvent() as H3Event
  const user = event.context.user
  if (!user)
    throw createError({ status: 401 })
  if (!hasAccess(user, policies))
    throw createError({ status: 403 })
}
