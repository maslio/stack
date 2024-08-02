export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('click', {
    mounted(el, binding) {
      el.addEventListener('mousedown', (e: Event) => {
        const target = e.target as HTMLElement
        if (target.tagName === 'TEXTAREA' || target.tagName === 'INPUT')
          return
        e.preventDefault()
        e.stopPropagation()
        binding.value?.(e)
      })
      el.addEventListener('click', (e: Event) => {
        // @ts-expect-error click from keyboard enter key
        if (!e.pointerType)
          binding.value?.(e)
      })
    },
  })
  nuxtApp.vueApp.directive('fast-click', {
    mounted(el) {
      el.addEventListener('mousedown', (e: Event) => {
        if (e instanceof MouseEvent && e.button === 0) {
          const target = e.target as HTMLElement
          if (target.tagName === 'TEXTAREA' || target.tagName === 'INPUT')
            return
          e.preventDefault()
          e.stopPropagation()
          el.dispatchEvent(new Event('click', { bubbles: true }))
        }
      })
      // el.addEventListener('click', (e: Event) => {
      //   // @ts-expect-error click from keyboard enter key
      //   // if (!e.pointerType)
      //   //   binding.value?.(e)
      // })
    },
  })
})
