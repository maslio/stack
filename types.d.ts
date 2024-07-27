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
