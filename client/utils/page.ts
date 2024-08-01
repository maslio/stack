import { resolve } from 'pathe'

export function resolvePage(...paths: string[]) {
  const result = resolve(...paths)
  // Remove repeated paths at the end
  const parts = result.split('/')
  const uniqueParts = parts.reduce((acc, part, index) => {
    if (index === parts.length - 1 && part === parts[index - 1])
      return acc
    return [...acc, part]
  }, [] as string[])
  const uniqueResult = uniqueParts.join('/')
  return uniqueResult
}
