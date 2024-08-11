export function getUsername(user: Record<string, any>) {
  const name = []
  if (user.first_name)
    name.push(user.first_name)
  if (user.last_name)
    name.push(user.last_name)
  if (!name.length)
    return 'Нет имени'
  return name.join(' ')
}
