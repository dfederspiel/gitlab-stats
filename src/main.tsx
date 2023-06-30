import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import ErrorPage from './components/ErrorPage.tsx';
import GitLabStats from './components/GitLabStats/GitLabStats.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/gitlab', element: <GitLabStats /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
