import type { AuthUser } from '../../utils/useAuth'

export default defineEventHandler(async (event) => {
  return event.context.user as AuthUser
})
