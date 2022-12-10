import { fileURLToPath } from 'url'

export default defineNuxtConfig({
  app: {
    head: {
      title: 'Cadence',
      htmlAttrs: {
        lang: 'en',
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { hid: 'og:title', name: 'og:title', content: 'Cadence' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'stylesheet',
          type: 'text/css',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap',
        },
      ],
    },
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
    layoutTransition: {
      name: 'layout',
      mode: 'out-in',
    },
  },

  css: ['~/assets/toast.css'],

  srcDir: 'src',

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    'nuxt-icon',
    '@pinia-plugin-persistedstate/nuxt',
  ],

  build: {
    transpile: ['@headlessui/vue'],
  },

  alias: {
    components: fileURLToPath(new URL('./src/components', import.meta.url)),
    composables: fileURLToPath(new URL('./src/composables', import.meta.url)),
    interfaces: fileURLToPath(new URL('./src/interfaces', import.meta.url)),
    services: fileURLToPath(new URL('./src/services', import.meta.url)),
    store: fileURLToPath(new URL('./src/store', import.meta.url)),
    utils: fileURLToPath(new URL('./src/utils', import.meta.url)),
  },

  runtimeConfig: {
    apiBaseUrl: process.env.API_BASE_URL,
  },
})
