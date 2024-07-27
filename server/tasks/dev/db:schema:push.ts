import { schemaApply, schemaDiff, schemaSnapshot } from '@directus/sdk'

export default defineTask({
  meta: {
    name: 'dev:db:schema:push',
    description: 'Push Directus Schema to remote',
  },
  async run() {
    await pushSchema()
    return { result: 'ok' }
  },
})

async function pushSchema() {
  const local = useDirectus('admin')
  const remote = useDirectus('remote')

  const snapshot = await local.request(schemaSnapshot())
  const diff = await remote.request(schemaDiff(snapshot))
  await remote.request(schemaApply(diff))
}
