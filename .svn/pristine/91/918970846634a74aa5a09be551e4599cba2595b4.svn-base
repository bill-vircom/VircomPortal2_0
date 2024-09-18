import apolloClient from '@/apollo/client'
import { CONTENT_QUERY } from '@/graphql/contentQuery'
import { useContentStore } from '@/store/contentStore'
import { cookieRef } from '@layouts/stores/config'
import { themeConfig } from '@themeConfig'
import { createI18n } from 'vue-i18n'
import { formatStrapiContent } from "./utils"

let _i18n: any = null

export const getI18n = (messages: Translations) => {
  if (_i18n === null) {
    _i18n = createI18n({
      legacy: false,
      locale: cookieRef('language', themeConfig.app.i18n.defaultLocale).value,
      fallbackLocale: 'en',
      messages,
    })
  }

  return _i18n
}

export default defineNuxtPlugin(async nuxtApp => {
  try {
    const { setContent } = useContentStore(nuxtApp.$pinia as any)
    const { data } = await apolloClient.query<StrapiRawContent>({ query: CONTENT_QUERY })
  
    const { translations: strapiContent, pages } = formatStrapiContent(data)

    setContent(pages)
  
    nuxtApp.vueApp.use(getI18n(strapiContent))
    console.log('✔ Content loaded in i18n')
  } catch (error) {
    console.error('X Error loading content loaded in i18n:', error)
  }
})
