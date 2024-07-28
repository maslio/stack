import type { User } from '../../directus/auth'

export default defineEventHandler(async (event) => {
  return event.context.user as User
})
