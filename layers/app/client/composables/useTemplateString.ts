export function useTemplateString(template: string) {
  const fields = template.match(/\{\{(.*?)\}\}/g)?.map(match => match.slice(2, -2).trim()) || []
  function parse(item: Record<string, any>) {
    return fields.map(field => item[field])
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim()
  }
  return {
    fields,
    parse,
  }
}
