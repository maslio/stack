import { getQuery } from './utils'
import type { Client } from './client'

export interface SubscribeOptions {
  filter?: Record<string, any>
  fields?: any[]
  search?: string
  onCreate?: (items: Item[]) => void
  onUpdate?: (items: Item[]) => void
  onDelete?: (keys: string[] | number[]) => void
}

export async function createSubscription(
  client: Client,
  collection: keyof DirectusSchema,
  options: SubscribeOptions,
) {
  const { subscription, unsubscribe } = await client.subscribe(collection, {
    query: getQuery(options),
  })
  async function start() {
    for await (const data of subscription) {
      if (data.event === 'create')
        options.onCreate?.(data.data)
      else if (data.event === 'update')
        options.onUpdate?.(data.data)
      else if (data.event === 'delete')
        options.onDelete?.(data.data)
    }
  }
  start()
  function stop() {
    unsubscribe()
  }
  return { stop }
}
