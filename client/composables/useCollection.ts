import {
  createItem as _createItem,
  deleteItems as _deleteItems,
  updateItem as _updateItem,
} from '@directus/sdk'

type ID = number | string

export function useCollection(collection: string) {
  const { requestAny } = useDirectus()
  async function createItem(data: Record<string, any>) {
    return await requestAny(_createItem(collection, data))
  }
  async function updateItem(id: ID, data: Record<string, any>) {
    return await requestAny(_updateItem(collection, id, data))
  }
  async function deleteItem(id: ID) {
    return await requestAny(_deleteItems(collection, [id as any]))
  }
  return { createItem, updateItem, deleteItem }
}
