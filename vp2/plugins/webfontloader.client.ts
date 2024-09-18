/**
 * plugins/webfontloader.js
 *
 * webfontloader documentation: https://github.com/typekit/webfontloader
 */

export async function loadFonts() {
  const webFontLoader = await import(/* webpackChunkName: "webfontloader" */'webfontloader')

  webFontLoader.load({
    google: {
      api: 'https://fonts.googleapis.com/css2',
      families: ['Maven+Pro:wght@400..900'],
    },
  })
}

export default defineNuxtPlugin(() => {
  loadFonts()
})
