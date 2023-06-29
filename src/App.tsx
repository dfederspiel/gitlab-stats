import './App.css';

import { Link, Outlet } from 'react-router-dom';


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
    <>
      <Menu />
      <Outlet />
    </>
  );
}

export default App;
