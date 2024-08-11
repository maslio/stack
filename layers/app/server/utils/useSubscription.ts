import type { Client } from './useDirectusClient'

export interface Options {
  query?: Record<string, any>
  onCreate?: (items: Record<string, any>[]) => void
  onUpdate?: (items: Record<string, any>[]) => void
  onDelete?: (keys: string[] | number[]) => void
}

function addId(fields?: any[]) {
  if (!fields)
    return fields
  if (fields.includes('*') || fields.includes('id'))
    return fields
  return ['id', ...fields]
}

function getQuery(data: Record<string, any>) {
  const query: Record<string, any> = {}
  if (data.filter)
    query.filter = data.filter
  if (data.fields)
    query.fields = addId(data.fields)
  if (data.search)
    query.search = data.search
  if (data.limit)
    query.limit = data.limit
  return query
}

export async function useSubscription(client: Client, collection: string, options: Options) {
  const { subscription, unsubscribe } = await client.subscribe(collection, {
    query: getQuery(options.query ?? {}),
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
  return unsubscribe
}
