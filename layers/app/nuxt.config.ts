import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  compatibilityDate: '2024-07-29',
  future: { compatibilityVersion: 4 },
  srcDir: 'client',
  serverDir: 'server',
  devServer: { port: 2000 },
  css: [
    '@unocss/reset/tailwind.css',
    join(currentDir, './client/assets/global.css'),
  ],
  modules: [
    ['@nuxtjs/color-mode', {
      classSuffix: '',
    }],
    ['@nuxt/icon', {
      componentName: 'NuxtIcon',
      size: '24px',
      mode: 'css',
      aliases: {
        spinner: 'mingcute:loading-fill',
        close: 'material-symbols:close',
        back: 'ic:baseline-arrow-back',
        search: 'material-symbols:search',
        more: 'mingcute:more-2-fill',
        sort: 'material-symbols:sort',
        edit: 'material-symbols:edit',
        send: 'material-symbols:send',
        next: 'fluent:chevron-right-16-filled',
      },
    }],
    // ['@nuxtjs/color-mode', {
    //   classSuffix: '',
    // }],
    '@unocss/nuxt',
    '@nuxt/image',
    '@nuxtjs/device',
    '@vueuse/nuxt',
  ],
  image: {
    directus: {
      baseURL: '/api/db/assets',
    },
  },
  components: {
    dirs: [{
      path: join(currentDir, './client/components'),
      ignore: [
        'dev/_directus/**',
        'open/**',
      ],
      pathPrefix: false,
      watch: true,
    }, {
      path: join(currentDir, './client/pages'),
      pathPrefix: true,
      isAsync: true,
      global: true,
      watch: true,
      prefix: 'page',
    }],
  },
  pages: false,
  runtimeConfig: {
    nitro: { envPrefix: '' },
    directusUrl: '',
    directusToken: '',
    remoteDirectusUrl: '',
    remoteDirectusToken: '',
    openaiApiKey: '',
    public: {
      language: 'en-US',
      languages: 'en-US',
    },
  },
  imports: getImports(),
  nitro: {
    imports: getImports(),
    experimental: {
      tasks: true,
      asyncContext: true,
    },
  },
  app: {
    head: {
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
        },
        {
          name: 'MobileOptimized',
          content: '320',
        },
      ],
    },
  },
})

function getImports() {
  const imports: any = {
    imports: [
      { from: 'delay', name: 'default', as: 'delay' },
      { from: 'zod', name: 'z' },
      { from: 'nanoid', name: 'nanoid' },
      { from: 'consola', name: 'consola' },
    ],
  }
  return imports
}
