export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('click', {
    mounted(el, binding) {
      el.addEventListener('mousedown', (e: Event) => {
        e.preventDefault()
        e.stopPropagation()
        binding.value?.(e)
      })
      el.addEventListener('click', (e: Event) => {
        // @ts-expect-error if click is from keyboard
        if (e.pointerType === '')
          binding.value?.(e)
      })
    },
  })
})
