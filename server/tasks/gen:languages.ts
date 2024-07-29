export default defineTask({
  meta: {
    name: 'generate:languages',
    description: 'Generate languages collection',
  },
  async run() {
    return { result: 'ok' }
  },
})
