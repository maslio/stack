import type { User } from '@directus/types'

interface DirectusUsers extends User {
}
interface Languages {
  code: string
  name?: string
  direction?: 'ltr' | 'rtl'
}
interface Products {
  id: number
  status: 'published' | 'draft' | 'archived'
  sort?: number
  name?: string
  translations: any
}
interface ProductsTranslations {
  id: number
  products_id?: number | Products
  languages_code?: string | Languages
}
global {
  interface DirectusSchema {
    languages: Languages[]
    products: Products[]
    products_translations: ProductsTranslations[]
    directus_users: DirectusUsers[]
  }
  type DirectusPolicy =
    'admin'
  type Item = Record<string, any>
}
