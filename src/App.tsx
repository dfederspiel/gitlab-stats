import { ApolloProvider } from '@apollo/client';
import './App.css';

import { Link, Outlet } from 'react-router-dom';
import getClient from './lib/apollo-client';

const Menu = () => {
  return (
    <ul className='menu'>
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
      <div className='header'>
        <Menu />
      </div>
      <div className='content'>
        <Outlet />
      </div>
    </ApolloProvider>
  );
}

export default App;
