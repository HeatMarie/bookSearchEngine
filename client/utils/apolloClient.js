import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
  headers: typeof window !== 'undefined' ? {
    authorization: localStorage.getItem('id_token') || ''
  } : {}
});

export default client;
