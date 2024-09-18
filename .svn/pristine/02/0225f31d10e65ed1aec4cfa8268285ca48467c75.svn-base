import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
  uri: 'http://127.0.0.1:1337/graphql', // Your Strapi GraphQL endpoint
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,

      // authorization: `Bearer ${process.env.STRAPI_TOKEN}` || '',
    },
  }
})

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export default apolloClient
