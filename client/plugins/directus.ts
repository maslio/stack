import type { AuthUser } from '../../types'

export default defineNuxtPlugin(async () => {
  const user = useState<AuthUser>('user')
  function access(...policies: DirectusPolicy[]): boolean {
    if (!user.value)
      return false
    return policies.filter(p => user.value.policies.includes(p)).length > 0
  }
  return {
    provide: {
      access,
    },
  }
})
