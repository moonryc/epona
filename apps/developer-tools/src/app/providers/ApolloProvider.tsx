import { ApolloClient, InMemoryCache, ApolloProvider as BaseApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { PropsWithChildren, ReactNode } from 'react';

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql', // Your GraphQL endpoint
});

// Auth link to add headers if needed
const authLink = setContext((_, { headers }) => {
  // Get auth token from localStorage or wherever you store it
  const token = localStorage.getItem('token');
  
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
    },
    query: {
      fetchPolicy: 'network-only',
    },
  },
});

export function ApolloProvider({ children }: PropsWithChildren<unknown>) {
  return (
    <BaseApolloProvider client={client}>
      {children}
    </BaseApolloProvider>
  );
}
