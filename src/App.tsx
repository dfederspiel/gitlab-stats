import { ApolloProvider } from '@apollo/client';
import './App.css';

import { Link, Outlet } from 'react-router-dom';
import getClient from './lib/apollo-client';
import { useState } from 'react';

const Menu = () => {
  const [activeItem, setActiveItem] = useState('gitlab');

  return (
    <ul className="menu">
      <li className={activeItem === 'gitlab' ? 'active' : ''}>
        <Link onClick={() => setActiveItem('gitlab')} to={`gitlab`}>
          GitLab Stats
        </Link>
      </li>
      <li className={activeItem === 'user' ? 'active' : ''}>
        <Link onClick={() => setActiveItem('user')} to={'user'}>
          Individual Stats
        </Link>
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
      <div className="header">
        <Menu />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </ApolloProvider>
  );
}

export default App;
