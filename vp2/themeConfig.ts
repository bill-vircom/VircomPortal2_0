import { breakpointsVuetifyV3 } from '@vueuse/core'
import { VIcon } from 'vuetify/components/VIcon'
import { defineThemeConfig } from '@core'
import { Skins } from '@core/enums'
import VerticalNavHeaderArrow from '@images/svg/vertical-nav-header-arrow.svg'

// ❗ Logo SVG must be imported with ?raw suffix
import logo from '@images/png/vircom.png'

import { AppContentLayoutNav, ContentWidth, FooterType, NavbarType } from '@layouts/enums'

export const { themeConfig, layoutConfig } = defineThemeConfig({
  app: {
    title: '',
    // ❗ if you have SVG logo and want it to adapt according to theme color, you have to apply color as `color: rgb(var(--v-global-theme-primary))`
    logo: h('img', { src: logo, alt: 'app-logo', style: 'width: 200px' }),
    contentWidth: ContentWidth.Boxed,
    contentLayoutNav: AppContentLayoutNav.Vertical,
    overlayNavFromBreakpoint: breakpointsVuetifyV3.lg - 1, // 1 for matching with vuetify breakpoint. Docs: https://next.vuetifyjs.com/en/features/display-and-platform/
    i18n: {
      enable: true,
      defaultLocale: 'en',
      langConfig: [
        {
          label: 'English',
          i18nLang: 'en',
          isRTL: false,
        },
        {
          label: 'Français',
          i18nLang: 'fr',
          isRTL: false,
        }
      ],
    },
    theme: 'system',
    skin: Skins.Default,
    iconRenderer: VIcon,
  },
  navbar: {
    type: NavbarType.Sticky,
    navbarBlur: true,
  },
  footer: { type: FooterType.Static },
  verticalNav: {
    isVerticalNavCollapsed: false,
    defaultNavItemIconProps: { icon: 'ri-circle-fill' },
    isVerticalNavSemiDark: false,
  },
  horizontalNav: {
    type: 'sticky',
    transition: 'slide-y-reverse-transition',
    popoverOffset: 4,
  },
  /*
  // ℹ️  In below Icons section, you can specify icon for each component. Also you can use other props of v-icon component like `color` and `size` for each icon.
  // Such as: chevronDown: { icon: 'ri-arrow-down-s-line', color:'primary', size: '24' },
  */
  icons: {
    chevronDown: { icon: 'ri-arrow-down-s-line' },
    chevronRight: { icon: 'ri-arrow-right-s-line' },
    close: { icon: 'ri-close-line' },
    verticalNavPinned: { icon: h(VerticalNavHeaderArrow) },
    verticalNavUnPinned: { icon: h(VerticalNavHeaderArrow) },
    sectionTitlePlaceholder: { icon: 'ri-subtract-line' },
  },
})
