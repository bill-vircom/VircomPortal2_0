export const formatStrapiContent = (data: StrapiRawContent) => {
  const translations: Translations = {}
  const pages: Pages = {}

  data.vpAssets.data.forEach(asset => {
    const { attributes: { key, value, locale, localizations } } = asset

    if (!translations[locale])
      translations[locale] = {}

    translations[locale][key] = value

    // Process localizations
    localizations.data.forEach(localizedAsset => {
      const { attributes: { value: lValue, locale: lLocale } } = localizedAsset

      if (!translations[lLocale])
        translations[lLocale] = {}

      translations[lLocale][key] = lValue
    })
  })

  data.vpPages.data.forEach(page => {
    const { attributes: { title, uri, description, name, locale, icon, localizations, order } } = page

    if (!pages[locale])
      pages[locale] = {}

    if (!translations[locale])
      translations[locale] = {}

    pages[locale][uri] = { title, description, name, icon, uri, order }
    translations[locale][name] = title
    // Process localizations
    localizations.data.forEach(localizedPage => {
      const { attributes: { title: lTitle, description: lDescription, name: lName, locale: lLocale } } = localizedPage

      if (!pages[lLocale])
        pages[lLocale] = {}

      if (!translations[locale])
        translations[lLocale] = {}

      pages[lLocale][uri] = { title: lTitle, description: lDescription, name: lName, icon, uri, order }
      translations[lLocale][lName] = lTitle
    })
  })

  return { translations, pages }
}

