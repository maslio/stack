import { omit } from 'lodash-es'

type AsyncData = ReturnType<typeof useAsyncData>

interface UseItemsOptions {
  filter?: any
  fields?: any
  search?: any
  limit?: any
  watch?: any[]
  count?: boolean
}
interface UseItems {
  items: Ref<Record<string, any>[]>
  count: Ref<number>
  refresh: AsyncData['refresh']
  status: AsyncData['status']
}

function getOption(options: UseItemsOptions, key: keyof UseItemsOptions) {
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

function getWatch(options: UseItemsOptions, refs: any[]) {
  if (options?.watch)
    return options.watch
  return refs.filter(r => isRef(r) || typeof r === 'function')
}

function getQuery(data: any) {
  const query: Record<string, any> = {}
  if (data.filter)
    query.filter = data.filter.value
  if (data.fields)
    query.fields = addId(data.fields.value)
  if (data.search)
    query.search = data.search.value
  if (data.limit)
    query.limit = data.limit.value
  return query
}

export async function useItems(collection: string, options: UseItemsOptions = {}): Promise<UseItems> {
  const { requestAny } = useDirectus()
  const id = useId()
  const filter = getOption(options, 'filter')
  const fields = getOption(options, 'fields')
  const search = getOption(options, 'search')
  const limit = getOption(options, 'limit')
  const watch = getWatch(options, [filter, fields, search, limit])
  const data = await useAsyncData(id, async () => {
    const query = getQuery({ filter, fields, search, limit })
    const requests = [requestAny(readItems(collection, query))]
    if (options.count) {
      requests.push(requestAny(aggregate(collection, {
        query: omit(query, 'fields', 'limit', 'skip', 'page'),
        aggregate: { count: 'id' },
      })))
    }
    const [items, count] = await Promise.all(requests)
    return { items, count: options.count ? count![0]!.count.id : null }
  }, { watch })
  const items = computed<Record<string, any>[]>(() => data.data.value?.items as Record<string, any>[])
  const count = computed<number>(() => data.data.value?.count)
  return {
    items,
    refresh: data.refresh,
    status: data.status,
    count,
  }
}
