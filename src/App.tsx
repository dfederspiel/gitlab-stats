import { ApolloProvider } from '@apollo/client';
import './App.css';

import { Link, Outlet } from 'react-router-dom';
import getClient from './lib/apollo-client';

const Menu = () => {
  return (
    <ul>
      <li>
        <Link to={`gitlab`}>GitLab Stats</Link>
      </li>
    </ul>
  );
};

function App() {
  return (
    <ApolloProvider
      client={getClient(
        `${import.meta.env.VITE_GITLAB_HOST}/api/graphql`,
        import.meta.env.VITE_GITLAB_PAT
      )}
    >
      <Menu />
      <Outlet />
    </ApolloProvider>
  );
}

export default App;
