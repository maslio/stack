import { createItems, readItems, utilsExport } from '@directus/sdk'

export default defineEventHandler(async (event) => {
  const name = getRouterParam(event, 'name')
  if (!name)
    return { error: 'No collection name provided' }
  console.log(name)
  const local = useDirectus('admin')
  const remote = useDirectus('remote')

  const data = await local.request(readItems(name))
  const result = await remote.request(createItems(name, data))

  return { data }
})
