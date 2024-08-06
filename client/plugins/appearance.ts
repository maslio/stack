export default defineNuxtPlugin({
  name: 'appearance',
  dependsOn: ['directus'],
  setup(nuxtApp) {
    const $user = nuxtApp.$user as Ref<AuthUser>
    const appearance = ref($user.value?.appearance ?? 'auto')

    const color = computed(() => {
      return appearance.value !== 'auto'
        ? appearance.value
        : usePreferredDark().value
          ? 'dark'
          : 'light'
    })

    useHead({
      htmlAttrs: { class: color },
    })
    return {
      provide: {
        appearance,
      },
    }
  },
})
