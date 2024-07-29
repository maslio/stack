export function addId(fields?: any[]) {
  if (!fields)
    return fields
  if (fields.includes('*') || fields.includes('id'))
    return fields
  return ['id', ...fields]
}

export function getQuery(data: Record<string, any>) {
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
