export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const eventStream = createEventStream(event)

  const { subscribe } = useDirectus(event)

  await subscribe(query.collection, {
    onUpdate(items) {
      eventStream.push(JSON.stringify({
        event: 'update',
        data: items,
      }))
    },
  })

  // client.onWebSocket('message', (message) => {
  //   console.log(message)
  // })

  // eventStream.onClosed(async () => {
  //   await eventStream.close()
  // })

  return eventStream.send()
})
