import { jwtDecode } from 'jwt-decode'
import type { AuthSession, AuthUser } from '../../types'

const cookieName = 'directus_session_token'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, cookieName)
  if (!token) {
    event.context.user = null
    return
  }
  try {
    const session = decodeDirectusToken(token)
    const user = await getUser(session)
    event.context.user = user
  }
  catch (e: any) {
    // consola.warn('Unable to parse user session: ', token)
    consola.error(e)
    // deleteCookie(event, cookieName)
  }
})

async function getUser(session: AuthSession): Promise<AuthUser> {
  const { requestAny } = useDirectus('admin')
  const user = await requestAny(readUser(session.id, {
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

function decodeDirectusToken(token: string) {
  return jwtDecode<AuthSession>(token)
}
