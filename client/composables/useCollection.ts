import type { Collection, Field } from '@directus/types'
import {
  aggregate as _aggregate,
  createItem as _createItem,
  deleteItems as _deleteItems,
  readCollection as _readCollection,
  readFieldsByCollection as _readFields,
  readItem as _readItem,
  readItems as _readItems,
  updateItem as _updateItem,
} from '@directus/sdk'

type ID = number | string
type Query = Record<string, any>

export function useCollection(collection: string) {
  const { request } = useDirectus()
  async function createItem(data: Record<string, any>) {
    return await request(_createItem(collection, data))
  }
  async function updateItem(id: ID, data: Record<string, any>) {
    return await request(_updateItem(collection, id, data))
  }
  async function deleteItem(id: ID) {
    return await request(_deleteItems(collection, [id as any]))
  }
  async function countItems(query: Query = {}): Promise<number> {
    const result = await request(_aggregate(collection, {
      query,
      aggregate: { count: 'id' },
    }))
    // @ts-expect-error directus types are not correct
    return result[0]?.count?.id ?? 0 as number
  }
  async function readItems<T = Record<string, any>>(query: Query = {}) {
    return await request(_readItems(collection, query)) as T[]
  }
  async function readItem<T = Record<string, any>>(key: ID, query: Query = {}) {
    return await request(_readItem(collection, key, query)) as T
  }
  async function readFields() {
    return await request(_readFields(collection)) as Field[]
  }
  async function readCollection(name: string) {
    return await request(_readCollection(name)) as Collection
  }

  return {
    createItem,
    updateItem,
    deleteItem,
    countItems,
    readItems,
    readItem,
    readFields,
    readCollection,
  }
}
