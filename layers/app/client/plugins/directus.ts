export default defineNuxtPlugin({
  name: 'directus',
  async setup() {
    const user = useState<AuthUser>('user')
    function access(...policies: string[]): boolean {
      if (!user.value)
        return false
      return policies.filter(p => user.value.policies.includes(p)).length > 0
    }
    return {
      provide: {
        access,
        user,
      },
    }
  },
})
