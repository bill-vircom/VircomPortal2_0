import { gql } from 'graphql-tag'

export const CONTENT_QUERY = gql`
  query Content {
    vpAssets (pagination: { limit: -1 }) {
      data {
        attributes {
          key
          value
          locale
          localizations {
            data {
              attributes {
                key
                value
                locale
              }
            }
          }
        }
      }
    }
    vpPages (pagination: { limit: -1 }) {
      data {
        attributes {
          title
          uri
          description
          name
          icon
          order
          localizations {
            data {
              attributes {
                title
                uri
                description
                name
                locale
              }
            }
          }
          locale
        }
      }
    }
  }
`
