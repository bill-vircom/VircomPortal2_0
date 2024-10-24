import { gql } from 'graphql-tag'

export const CONTENT_QUERY = gql`
  query Content {
    vpAssets {
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
    vpPages {
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
