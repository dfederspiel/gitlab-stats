import { ApolloProvider } from '@apollo/client';
import getClient from '../../lib/apollo-client';
import Stats from './Stats';


const GitLabStats = () => {
  return (
    <ApolloProvider
      client={getClient(
        `${import.meta.env.VITE_GITLAB_HOST}/api/graphql`,
        import.meta.env.VITE_GITLAB_PAT
      )}
    >
     <Stats />
    </ApolloProvider>
  );
};

export default GitLabStats;
