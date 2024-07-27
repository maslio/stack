export default defineEventHandler(async (event) => {
  // useAccess('admin')
  const name = getRouterParam(event, 'name')!
  const result = await runTask(name, {})
  return { result }
})
