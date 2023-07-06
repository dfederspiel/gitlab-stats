import { ApolloLink, HttpLink } from '@apollo/client';

export const httpLink = new HttpLink({
  uri: `${import.meta.env.VITE_GITLAB_HOST}/api/graphql`,
});

export const authMiddleware = (pat: string) => {
  return new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: `Bearer ${pat}` || null,
      },
    }));

    return forward(operation);
  });
};
