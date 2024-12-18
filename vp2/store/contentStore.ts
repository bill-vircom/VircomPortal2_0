import { defineStore } from 'pinia'
import icons from "../navigation/vertical"
interface ContentState {
  lang: string
  pages: Pages
}

export const useContentStore = defineStore('content', {
  state: (): ContentState => ({
    lang: 'en',
    pages: {}
  }),
  actions: {
    setContent(pages: Pages) {
      this.pages = pages
    },
    initContentStore(lang: string) {
      this.lang = lang
    }
  },
  getters: {
    tPages: state => (value: string) => state.pages[state.lang]?.[value],
    navItems: state => Object.keys(state.pages[state.lang])
    .sort((key, keyB) => {
      const page = state.pages[state.lang][key];
      const pageB = state.pages[state.lang][keyB];
      return page?.order - pageB?.order
    })
    .map(key => {
      const page = state.pages[state.lang][key];
      return {
        title :page.name,
        to: { name: page.uri },
        icon: { icon: page.icon }
      }
    })
  },
})
