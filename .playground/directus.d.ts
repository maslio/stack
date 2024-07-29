import type { User } from '@directus/types'

interface DirectusUsers extends User {
}
interface Products {
  id: number
  status: 'published' | 'draft' | 'archived'
  sort?: number
  name?: string
}
global {
  interface DirectusSchema {
    products: Products[]
    directus_users: DirectusUsers[]
  }
  type DirectusPolicy = 
    'admin'
  type Item = Record<string, any>
}
