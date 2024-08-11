import { Buffer } from 'node:buffer'
import { type AssetsQuery, readAssetArrayBuffer } from '@directus/sdk'
import type { H3Event } from 'h3'
import { type Client, useDirectusClient } from './useDirectusClient'
import { type Options as SubscribeOptions, useSubscription } from './useSubscription'

export function useDirectus(event: H3Event | 'admin' | 'remote') {
  const client = useDirectusClient(event)
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

  async function subscribe(collection: string, options: SubscribeOptions = {}) {
    await connect()
    return useSubscription(client, collection, options)
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
