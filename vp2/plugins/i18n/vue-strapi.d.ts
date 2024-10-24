
interface vpAssets {
  data: {
    attributes: {
      key: string
      value: string
      locale: string
      localizations: {
        data: vpAssets["data"]
      }
    }
  }[]
}

interface vpPages {
  data: {
    attributes: {
      title: string
      uri: string
      description: string
      name: string
      locale: string
      icon: string
      order: number;
      localizations: {
        data: vpPages["data"]
      }
    }
  }[]
}

interface StrapiRawContent {
  vpAssets: vpAssets
  vpPages: vpPages
}

type Translations = Record<string, Record<string, string>>

type Pages = Record<string, Record<string, { title: string
  description: string
  name: string, icon: string, uri: string, order: number }>>
