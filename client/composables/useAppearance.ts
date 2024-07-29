import { updateUser } from '@directus/sdk'

type Mode = 'auto' | 'light' | 'dark'
function toNuxtMode(value: Mode) {
  return value === 'auto' ? 'system' : value
}

export function useAppearance() {
  const colorMode = useColorMode()
  const { user, request } = useDirectus()
  const mode = ref<Mode>(user.value?.appearance ?? 'auto')

  function apply() {
    colorMode.preference = toNuxtMode(mode.value)
  }
  watch(mode, (value) => {
    colorMode.preference = toNuxtMode(value)
    apply()
    if (user.value)
      request(updateUser(user.value.id, { appearance: value }))
  })
  return { apply, mode }
}
