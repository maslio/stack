import { schemaApply, schemaDiff, schemaSnapshot } from '@directus/sdk'

const schema = z.object({
  // collections: z.array(z.string()),
  mode: z.enum(['push', 'pull']),
})

export default defineLazyEventHandler(async () => {
  const local = useDirectus('admin')
  const remote = useDirectus('remote')

  return defineEventHandler(async (event) => {
    const { mode } = await readValidatedBody(event, schema.parse)

    const [source, target] = mode === 'push' ? [local, remote] : [remote, local]

    const snapshot = await source.request(schemaSnapshot())
    const diff = await target.request(schemaDiff(snapshot, true))
    await target.request(schemaApply(diff))
  })
})
