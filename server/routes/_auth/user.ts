import type { AuthUser } from '../../../types'

export default defineEventHandler(async (event) => {
  return event.context.user as AuthUser
})
