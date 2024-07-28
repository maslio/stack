import type { AuthenticationClient, DirectusClient, RestClient, WebSocketClient } from '@directus/sdk'
import type { AuthUser } from '../../types'
import { type Ref, useNuxtApp, useState } from '#imports'

// type Client = DirectusClient<DirectusSchema> & RestClient<DirectusSchema> & AuthenticationClient<DirectusSchema>
type Client = DirectusClient<any> & RestClient<any> & AuthenticationClient<any>

export function useDirectus() {
  const nuxtApp = useNuxtApp()
  const client = nuxtApp.$directus as Client

  const request: Client['request'] = options => client.request(options)

  const requestAny: Client['request'] = options => client.request(options)

  const user: Ref<AuthUser | null> = useState<AuthUser>('user')

  const login: Client['login'] = async (email, password, options) => {
    const authData = await client.login(email, password, options)
    user.value = await $fetch('/_auth/user')
    return authData
  }
  const logout: Client['logout'] = async () => {
    await client.logout()
    user.value = null
  }

  async function refreshUser() {
    user.value = await $fetch('/_auth/user')
  }

  return {
    client,
    request,
    login,
    logout,
    user,
    refreshUser,
    requestAny,
  }
}
