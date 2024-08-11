import { pascalCase } from 'scule'

export function resolvePage(name: string) {
  return pascalCase(`lazy-page-${name?.replace(/:/g, '-')}`)
}
