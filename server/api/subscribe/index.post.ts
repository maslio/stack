export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const id = nanoid()
  const storage = useStorage('directus:subscriptions')
  await storage.setItem(id, body)
  return id
})
