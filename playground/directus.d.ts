import type { User } from '@directus/types'

interface DirectusUsers extends User {
}
global {
  interface DirectusSchema {
    directus_users: DirectusUsers[]
  }
  type DirectusPolicy =
    'admin'
  type Item = Record<string, any>
}
