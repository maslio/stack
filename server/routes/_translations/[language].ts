export default defineLazyEventHandler(() => {
  return defineEventHandler((event) => {
    const language = getRouterParam(event, 'language')
    return {
      language,
    }
  })
})
