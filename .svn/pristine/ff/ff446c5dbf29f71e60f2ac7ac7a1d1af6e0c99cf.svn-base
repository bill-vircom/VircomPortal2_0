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
    navItems: state => Object.keys(state.pages[state.lang]).map(key => {
      const navIcon = icons as unknown as Record<string,{ icon: string; activeIcon: string}>
      return {
        title: state.pages[state.lang][key].name,
        to: { name: state.pages[state.lang][key].name.replace(/_/g, "-") },
        icon: navIcon[key]
      }
    })
  },
})
