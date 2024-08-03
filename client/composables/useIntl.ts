type SecondArgument<T> = T extends (arg1: any, arg2: infer U, ...args: any[]) => any ? U : any

export function useIntlDateFormat(options: SecondArgument<typeof Intl.DateTimeFormat>) {
  const { $language } = useNuxtApp()
  return (date: string | Date) => {
    const { format } = new Intl.DateTimeFormat($language.value, options)
    if (typeof date === 'string')
      return format(new Date(date))
    return format(date)
  }
}

export function useIntlDateRangeFormat(options: SecondArgument<typeof Intl.DateTimeFormat>) {
  const { $language } = useNuxtApp()
  return (start: string | Date, end: string | Date) => {
    const intl = new Intl.DateTimeFormat($language.value, options)
    if (typeof start === 'string')
      start = new Date(start)
    if (typeof end === 'string')
      end = new Date(end)
    return intl.formatRange(start, end)
  }
}

export function useIntlNumberFormat(options?: SecondArgument<Intl.NumberFormat>) {
  const { $language } = useNuxtApp()
  return (input: number) => {
    const format = new Intl.NumberFormat($language.value, options).format
    return format(input)
  }
}
