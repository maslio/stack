import type { H3Event } from 'h3'

export interface AuthUser {
  id: string
  email: string
  appearance: null | 'auto' | 'dark' | 'light'
  language: string | null
  first_name: string | null
  last_name: string | null
  avatar: string | null
  policies: string[]
}

export interface AuthSession {
  id: string
  role: string
  app_access: boolean
  admin_access: boolean
  session: string
  iat: number
  exp: number
  iss: string
}

export function useAuth(event: H3Event) {
  const user = event.context.user as AuthUser | null
  const session = event.context.sessions as unknown as AuthSession | null
  function checkAccess(...policies: string[]) {
    if (!user)
      throw createError({ status: 401, message: 'Unauthorized' })
    if (!hasAccess(...policies))
      throw createError({ status: 403, message: 'Forbidden' })
  }
  function hasAccess(...policies: string[]) {
    if (!user)
      return false
    return policies.filter(p => user.policies.includes(p)).length !== 0
  }
  return {
    user,
    session,
    checkAccess,
    hasAccess,
  }
}
