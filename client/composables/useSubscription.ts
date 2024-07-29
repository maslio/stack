export interface Options {
  query: Record<string, any>
  onCreate?: (items: Record<string, any>[]) => void
  onUpdate?: (items: Record<string, any>[]) => void
  onDelete?: (keys: string[] | number[]) => void
}

export async function useSubscription(collection: string, options: Options) {
  let eventSource: EventSource | null = null
  onBeforeUnmount(() => {
    eventSource?.close()
  })
  const id = await $fetch('/api/subscribe', {
    method: 'POST',
    body: { collection, query: options.query },
  })
  eventSource = new EventSource(`/api/subscribe/${id}`)
  eventSource.onmessage = (message) => {
    const { event, data } = JSON.parse(message.data)
    if (event === 'create' && data[0])
      options.onCreate?.(data)
    else if (event === 'update' && data[0])
      options.onUpdate?.(data)
    else if (event === 'delete')
      options.onDelete?.(data)
  }
  return () => {
    eventSource.close()
  }
}
