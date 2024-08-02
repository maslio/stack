export default defineNuxtConfig({
  compatibilityDate: '2024-07-29',
  future: { compatibilityVersion: 4 },
  extends: ['..'],
  srcDir: 'client',
  serverDir: 'server',
  devServer: { port: 2000 },
  devtools: { enabled: true },
  components: {
    dirs: [
      {
        path: 'components',
        pathPrefix: true,
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
