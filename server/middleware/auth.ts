import { jwtDecode } from 'jwt-decode'
import { readUser } from '@directus/sdk'
import type { AuthSession, AuthUser } from '../utils/useAuth'

function decodeToken(token: string) {
  return jwtDecode<AuthSession>(token)
}

const cookieName = 'directus_session_token'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, cookieName)
  if (!token) {
    event.context.user = null
    return
  }
  try {
    const session = decodeToken(token)
    const user = await fetchUser(session)
    event.context.user = user
    event.context.session = session
  }
  catch (e: any) {
    consola.error(e)
  }
})

async function fetchUser(session: AuthSession): Promise<AuthUser> {
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
