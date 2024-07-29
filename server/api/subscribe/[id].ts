export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)
  if (!id)
    throw createError({ status: 400, message: 'Invalid subscription id' })
  const storage = useStorage('directus:subscriptions')
  const data = await storage.getItem<{ collection: string, query: Record<string, any> }>(id)
  if (!data)
    throw createError({ status: 404, message: 'Subscription not found' })
  const { collection, query } = data
  const eventStream = createEventStream(event)
  const { subscribe } = useDirectus(event)

  type Event = 'update' | 'delete' | 'create'
  function send(event: Event, items: any[]) {
    eventStream.push(JSON.stringify({
      event,
      data: items,
    }))
  }

  await subscribe(collection, {
    query,
    onUpdate(items) { send('update', items) },
    onDelete(items) { send('delete', items) },
    onCreate(items) { send('create', items) },
  })

  return eventStream.send()
})
