import { createItems, deleteItems, readItems } from '@directus/sdk'

const schema = z.object({
  collection: z.string(),
  mode: z.enum(['push', 'pull']),
  clear: z.boolean().optional(),
})

export default defineLazyEventHandler(async () => {
  const local = useDirectus('admin')
  const remote = useDirectus('remote')

  return defineEventHandler(async (event) => {
    const { collection, mode, clear } = await readValidatedBody(event, schema.parse)

    const [source, target] = mode === 'push' ? [local, remote] : [remote, local]

    if (clear)
      await target.request(deleteItems(collection, { limit: -1 }))

    const items = await source.request(readItems(collection))
    await target.request(createItems(collection, items))
    return items.length
  })
})
