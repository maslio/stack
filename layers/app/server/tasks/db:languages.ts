import { createCollection, createItem, readCollections } from '@directus/sdk'
import collectionData from './languages.json'

export default defineTask({
  meta: {
    name: 'db:languages',
    description: 'Generate languages collection if not exists',
  },
  async run() {
    return { result: await generateLanguages() }
  },
})

async function generateLanguages() {
  const { request } = useDirectus('admin')
  const collections = await request(readCollections())
  if (collections.find(c => c.collection === 'languages'))
    return 'exists'

  await request(createCollection(collectionData))
  await request(createItem('languages', {
    code: 'en-US',
    name: 'English',
    direction: 'ltr',
  }))
  return 'created'
}
