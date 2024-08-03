export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('click', {
    mounted(el, binding) {
      el.addEventListener('mousedown', (e: MouseEvent) => {
        if (e.button === 2)
          return
        const target = e.target as HTMLElement
        if (target.tagName === 'TEXTAREA' || target.tagName === 'INPUT')
          return
        e.preventDefault()
        e.stopPropagation()
        binding.value?.(e)
      })
      el.addEventListener('click', (e: MouseEvent) => {
        // @ts-expect-error click from keyboard enter key
        if (!e.pointerType)
          binding.value?.(e)
      })
    },
  })
})
