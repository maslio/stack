export default defineNuxtConfig({
  compatibilityDate: '2024-08-01',
  future: { compatibilityVersion: 4 },
  extends: ['../..'],
  serverDir: 'server',
  devServer: { port: 4000 },
  devtools: { enabled: true },
  components: {
    dirs: [
      {
        path: 'components',
        pathPrefix: false,
        watch: true,
      },
      {
        path: 'pages',
        pathPrefix: true,
        isAsync: true,
        global: true,
        watch: true,
        prefix: 'page',
      },
    ],
  },
})
