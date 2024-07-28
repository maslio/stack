import { jwtDecode } from 'jwt-decode'

export interface User {
  id: string
  email: string
  appearance: null | 'auto' | 'dark' | 'light'
  language: string | null
  first_name: string | null
  last_name: string | null
  avatar: string | null
  policies: string[]
}

export interface Session {
  id: string
  role: string
  app_access: boolean
  admin_access: boolean
  session: string
  iat: number
  exp: number
  iss: string
}

export function decodeToken(token: string) {
  return jwtDecode<Session>(token)
}

export function hasAccess(user: User, policies: DirectusPolicy[]): boolean {
  return policies.filter(p => user.policies.includes(p)).length !== 0
}

export async function getUser(session: Session): Promise<User> {
  const { request } = useDirectus('admin')
  const user = await request(readUser(session.id, {
    fields: [
      'id',
      'first_name',
      'last_name',
      'email',
      'avatar',
      'appearance',
      'language',
      'policies.policy.name',
      'role.policies.policy.name',
    ],
  }))
  const policies = new Set<string>()
  function addPolicy(name: string) {
    if (name === 'Administrator')
      policies.add('admin')
    else
      policies.add(name.toLowerCase())
  }
  for (const p of user.policies)
    addPolicy(p.policy.name)
  if (user.role) {
    for (const p of user.role.policies)
      addPolicy(p.policy.name)
  }
  return {
    id: user.id,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    avatar: user.avatar,
    appearance: user.appearance,
    language: user.language,
    policies: [...policies],
  }
}
