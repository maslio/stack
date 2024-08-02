export interface Language {
  code: string
  name: string
  direction: 'ltr' | 'rtl'
}

export interface TranslationValue {
  id?: string | null
  language: string
  value: string
}

export interface Translation {
  key: string
  create?: boolean
  values: TranslationValue[]
}
