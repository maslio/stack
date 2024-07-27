import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  compatibilityDate: '2024-07-17',
  future: { compatibilityVersion: 4 },
  srcDir: 'client',
  serverDir: 'server',
  css: [
    '@unocss/reset/tailwind.css',
    join(currentDir, './client/assets/global.css'),
  ],
  modules: [
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
    ['@nuxtjs/color-mode', {
      classSuffix: '',
    }],
    '@unocss/nuxt',
    '@nuxt/image',
    '@nuxtjs/device',
    '@vueuse/nuxt',
  ],
  image: {
    directus: {
      baseURL: '/_db/assets',
    },
  },
  components: {
    dirs: [{
      path: join(currentDir, './client/components'),
      pathPrefix: false,
      watch: true,
    }],
  },
  runtimeConfig: {
    nitro: { envPrefix: '' },
    directusUrl: '',
    directusToken: '',
    remoteDirectusUrl: '',
    remoteDirectusToken: '',
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
})

function getImports() {
  const imports: any = {
    presets: [
      'date-fns',
      {
        from: '@directus/sdk',
        imports: [
          'readItem',
          'readItems',
          'createItem',
          'createItems',
          'updateItem',
          'updateItems',
          'deleteItem',
          'deleteItems',
          'aggregate',
          'readUsers',
          'readUser',
          'readMe',
          'updateMe',
          'createUser',
          'createUsers',
          'updateUser',
          'updateUsers',
          'deleteUser',
          'deleteUsers',
          'inviteUser',
          'acceptUserInvite',
          'generateTwoFactorSecret',
          'enableTwoFactor',
          'disableTwoFactor',
          'readAssetRaw',
          'readFiles',
          'readFile',
          'uploadFiles',
          'importFile',
          'updateFile',
          'updateFiles',
          'deleteFile',
          'deleteFiles',
        ],
      },
    ],
    imports: [
      { from: 'delay', name: 'default', as: 'delay' },
      { from: 'zod', name: 'z' },
      { from: 'nanoid', name: 'nanoid' },
      { from: 'consola', name: 'consola' },
    ],
  }
  return imports
}
