export default defineNuxtConfig({
  compatibilityDate: '2024-07-17',
  future: { compatibilityVersion: 4 },
  extends: ['..'],
  srcDir: 'client',
  serverDir: 'server',
  devServer: { port: 2000 },
  components: {
    dirs: [
      {
        path: 'components',
        pathPrefix: true,
        watch: true,
      },
    ],
  },
})
