import {
  deleteItems as _deleteItems,
  updateItem as _updateItem,
  readItem,
} from '@directus/sdk'
import { useSubscription } from './useSubscription'

type AsyncData = ReturnType<typeof useAsyncData>

interface UseItemOptions {
  fields?: any
  watch?: any[]
  live?: boolean
}

export interface UseItem {
  item: Ref<Record<string, any>>
  refresh: AsyncData['refresh']
  status: AsyncData['status']
  updateItem: (date: Record<string, any>) => Promise<Record<string, any>>
  deleteItem: () => Promise<void>
}

function getOption(options: UseItemOptions, key: keyof UseItemOptions) {
  if (!options[key])
    return
  if (typeof options[key] === 'function')
    return computed(options[key])
  if (isRef(options[key]))
    return computed(() => options[key].value)
  return { value: options[key] }
}

function addId(fields?: any[]) {
  if (!fields)
    return fields
  if (fields.includes('*') || fields.includes('id'))
    return fields
  return ['id', ...fields]
}

function getQuery(data: any) {
  const query: Record<string, any> = {}
  if (data.fields)
    query.fields = addId(data.fields.value)
  return query
}

export async function useItem(collection: string, key: string | number, options: UseItemOptions = {}): Promise<UseItem> {
  const { requestAny } = useDirectus()

  const fields = getOption(options, 'fields')

  const query = getQuery({ fields })

  const asyncData = await useAsyncData(useId(), async () => {
    return await requestAny(readItem(collection, key, query))
  })

  const item = computed(() => asyncData.data.value as Record<string, any>)

  async function updateItem(data: Record<string, any>) {
    return await requestAny(_updateItem(collection, key, data))
  }
  async function deleteItem() {
    return await requestAny(_deleteItems(collection, [key as string]))
  }

  if (options.live) {
    useSubscription(collection, {
      query,
      onUpdate(data) {
        asyncData.data.value = data[0]
      },
    })
  }

  return {
    item,
    refresh: asyncData.refresh,
    status: asyncData.status,
    updateItem,
    deleteItem,
  }
}
