import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  concat,
} from '@apollo/client';

/**
 *
 * @param uri GraphQL Host URL
 * @param token Personal Access Token (PAT)
 * @returns {ApolloClient} ApolloClient instance to be used as a provider prop
 */
const getClient = (uri: string, token: string) => {
  const httpLink = new HttpLink({
    uri,
  });

  const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: `Bearer ${token}` || null,
      },
    }));

    return forward(operation);
  });

  const client = new ApolloClient({
    link: concat(authMiddleware, httpLink),
    cache: new InMemoryCache({
      resultCaching: true,
    }),
  });

  return client;
};

export default getClient;
