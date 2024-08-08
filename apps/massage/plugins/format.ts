export default defineNuxtPlugin(() => {
  const formatBaht = useIntlNumberFormat({ style: 'currency', currency: 'THB', minimumFractionDigits: 0 })

  return {
    provide: {
      formatBaht,
    },
  }
})
