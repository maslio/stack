import { endOfDay, startOfDay } from 'date-fns'

export function dateFormat(date: Date, iso: boolean = false) {
  const _date = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString()
  if (iso)
    return _date
  return _date.split('T')[0] as string
}

export function between(date1: string | Date, date2?: string | Date) {
  date2 ??= date1
  if (typeof date1 === 'string')
    date1 = new Date(date1)
  if (typeof date2 === 'string')
    date2 = new Date(date2)
  return { _between: [startOfDay(date1), endOfDay(date2)] }
}
