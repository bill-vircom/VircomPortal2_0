import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import { fileURLToPath } from 'node:url'
import vuetify from 'vite-plugin-vuetify'
import svgLoader from 'vite-svg-loader'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    preset: 'iis',
    // IIS options default
    iis: {
      // merges in a pre-existing web.config file to the nitro default file
      mergeConfig: true,
      // overrides the default nitro web.config file all together
      overrideConfig: false,
    },
  },
  app: {
    head: {
      titleTemplate: '%s - Portal 2',
      title: 'Vircom',

      link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/logo.png',
      }],
    },
  },

  runtimeConfig: {
    public: {
      apiGraphQLUrl: process.env.NUXT_PUBLIC_API_GRAPHQL_URL,
      sessionStorageKey: process.env.NUXT_PUBLIC_SESSION_STORAGE_KEY,
      sessionStorageKeyRefresh: process.env.NUXT_PUBLIC_SESSION_STORAGE_KEY_REFRESH,
      authSite: process.env.NUXT_PUBLIC_AUTH_SITE,
      apiSite: process.env.NUXT_PUBLIC_API_SITE,
      vp2Backend: process.env.NUXT_PUBLIC_VP2_BACKEND,
      psaSync: process.env.NUXT_PUBLIC_PSA_SYNC,
      ppManager: process.env.NUXT_PUBLIC_PP_MANAGER,
      vircomPortal: process.env.NUXT_PUBLIC_VIRCOM_PORTAL
    }
  },

  devtools: {
    enabled: true,
  },

  css: [
    '@core/scss/template/index.scss',
    '@styles/styles.scss',
    '@/plugins/iconify/icons.css',
  ],

  components: {
    dirs: [{
      path: '@/@core/components',
      pathPrefix: false,
    }, {
      path: '~/components/global',
      global: true,
    }, {
      path: '~/components',
      pathPrefix: false,
    }],
  },

  plugins: [
    '@/plugins/vuetify/index.ts',
    '@/plugins/iconify/index.ts',
    '@/plugins/i18n/index.ts',
  ],

  imports: {
    dirs: ['./@core/utils', './@core/composable/', './plugins/*/composables/*'],
    presets: ['vue-i18n'],
  },

  hooks: {},

  experimental: {
    typedPages: true,
  },

  typescript: {
    tsConfig: {
      compilerOptions: {
        paths: {
          '@/*': ['../*'],
          '@themeConfig': ['../themeConfig.ts'],
          '@layouts/*': ['../@layouts/*'],
          '@layouts': ['../@layouts'],
          '@core/*': ['../@core/*'],
          '@core': ['../@core'],
          '@images/*': ['../assets/images/*'],
          '@styles/*': ['../assets/styles/*'],
          '@validators': ['../@core/utils/validators'],
          '@db/*': ['../server/fake-db/*'],
          '@api-utils/*': ['../server/utils/*'],
          '@store/*': ['../store/*'],
        },
      },
    },
  },

  // ℹ️ Disable source maps until this is resolved: https://github.com/vuetifyjs/vuetify-loader/issues/290
  sourcemap: {
    server: false,
    client: false,
  },

  vue: {
    compilerOptions: {
      isCustomElement: tag => tag === 'swiper-container' || tag === 'swiper-slide',
    },
  },

  vite: {
    define: { 'process.env': {} },

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('.', import.meta.url)),
        '@themeConfig': fileURLToPath(new URL('./themeConfig.ts', import.meta.url)),
        '@core': fileURLToPath(new URL('./@core', import.meta.url)),
        '@layouts': fileURLToPath(new URL('./@layouts', import.meta.url)),
        '@images': fileURLToPath(new URL('./assets/images/', import.meta.url)),
        '@styles': fileURLToPath(new URL('./assets/styles/', import.meta.url)),
        '@configured-variables': fileURLToPath(new URL('./assets/styles/variables/_template.scss', import.meta.url)),
        '@db': fileURLToPath(new URL('./server/fake-db/', import.meta.url)),
        '@api-utils': fileURLToPath(new URL('./server/utils/', import.meta.url)),
      },
    },

    build: {
      chunkSizeWarningLimit: 5000,
      sourcemap: true
    },

    optimizeDeps: {
      exclude: ['vuetify'],
      entries: [
        './**/*.vue',
      ],
    },

    plugins: [
      svgLoader(),
      vuetify({
        styles: {
          configFile: 'assets/styles/variables/_vuetify.scss',
        },
      }),
       VueI18nPlugin({
        runtimeOnly: true,
        compositionOnly: true,
        ssr: true
      }),
      null,
    ],
  },

  build: {
    transpile: ['vuetify'],
  },

  apollo: {
    clients: {
      default: {
        httpEndpoint: process.env.NUXT_PUBLIC_API_GRAPHQL_URL as string
      }
    },
  },

  modules: ['@vueuse/nuxt', '@nuxtjs/apollo', '@nuxtjs/device', '@pinia/nuxt'],
})
