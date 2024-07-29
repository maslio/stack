import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { writeFile } from 'node:fs/promises'
import { pascalCase } from 'scule'
import { createDirectus, readCollections, readFields, rest, staticToken } from '@directus/sdk'
import type { Collection, Field } from '@directus/types'

const rootDir = dirname(dirname(dirname(fileURLToPath(import.meta.url))))
const filename = join(rootDir, 'directus.d.ts')

export default defineTask({
  meta: {
    name: 'generate:directus',
    description: 'Generate directus.d.ts file',
  },
  async run() {
    const config = useRuntimeConfig()
    const { schema, collections, policies } = await generate(config.directusUrl, config.directusToken)
    await writeFile(filename, schema)
    consola.info('Directus schema updated!')
    return { result: { policies, collections } }
  },
})

async function generate(directusUrl: string, directusToken: string) {
  const client = createDirectus(directusUrl)
    .with(rest())
    .with(staticToken(directusToken))

  const _collections = await client.request(readCollections()) as Collection[]
  const fields = await client.request(readFields()) as Field[]

  const collections = _collections.filter(col => !col.collection.startsWith('directus_'))

  const schema: string[] = []

  schema.push(`import type { User } from '@directus/types'`)
  schema.push('')

  schema.push(`interface ${collection('directus_users')} extends User {`)
  schema.push(`}`)

  // interfaces for all collections
  for (const col of collections) {
    schema.push(`interface ${collection(col.collection)} {`)
    for (const field of fields.filter(f => f.collection === col.collection))
      schema.push(`  ${tsType(field)}`)
    schema.push('}')
  }

  // Schema interface
  schema.push('global {')
  schema.push(`  interface DirectusSchema {`)
  for (const col of collections)
    schema.push(`    ${col.collection}: ${collection(col.collection)}[]`)
  schema.push(`    directus_users: ${collection('directus_users')}[]`)
  schema.push('  }')

  const policies = await (async () => {
    const policies = await client.request<{ name: string }[]>(() => ({
      path: '/policies',
      params: {},
      method: 'GET',
    }))
    return policies
      .filter(p => !p.name.startsWith('$t:'))
      .map(p => p.name.toLowerCase())
      .map(name => name === 'administrator' ? 'admin' : name)
  })()

  schema.push('  type DirectusPolicy = ')
  schema.push(`    ${policies
    .map(p => `'${p}'`)
    .join(' |\n    ')}`)

  schema.push('  type Item = Record<string, any>')
  schema.push('}')
  schema.push('')

  return {
    schema: schema.join('\n'),
    collections: collections.map(c => c.collection),
    policies,
  }
}

function tsType(field: Field) {
  const key = field.field
  let type: string
  switch (field.type) {
    case 'uuid':
      type = 'string'; break
    case 'integer':
      type = 'number'; break
    case 'float':
      type = 'number'; break
    case 'boolean':
      type = 'boolean'; break
    case 'timestamp':
      type = '\'datetime\''; break
    case 'string':
      type = 'string'; break
    case 'text':
      type = 'string'; break
    default:
      type = 'any'; break
  }
  if (field.schema?.data_type === 'json')
    type = '\'json\''

  if (field.meta?.options?.choices) {
    interface Choise { value: string }
    const choices = field.meta.options.choices as Choise[]
    type = choices.map(c => `'${c.value}'`).join(' | ')
  }
  else if (field.schema?.foreign_key_table) {
    type = `${type} | ${collection(field.schema.foreign_key_table)}`
  }
  const q = field.schema?.is_nullable ? '?' : ''
  return `${key}${q}: ${type}`
}

function collection(name: string) {
  return pascalCase(name)
}
