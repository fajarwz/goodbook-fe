import { createBrowserRouter } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import { checkAuthLoader } from './utils/http/admin/token';
import Admin from './layouts/admin';
import Members from './pages/Members';
import ErrorBlock from './components/ErrorBlock';
import Books from './pages/Books';
import Reviews from './pages/Reviews';
import Home from './pages/Home';

const router = createBrowserRouter([
    {
      path: 'admin',
      element: <Admin />,
      loader: checkAuthLoader,
      children: [
        {
          path: 'dashboard',
          element: <Dashboard />,
          loader: checkAuthLoader,
        },
        {
          path: 'reviews',
          element: <Reviews />,
          loader: checkAuthLoader,
        },
        {
          path: 'books',
          element: <Books />,
          loader: checkAuthLoader,
        },
        {
          path: 'members',
          element: <Members />,
          loader: checkAuthLoader,
        },
      ],
    },
    {
      path: 'admin/login',
      element: <Login />,
    },
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '*',
      element: <ErrorBlock title={'Page not found.'} />,
    },
])

export default router