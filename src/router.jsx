import { createBrowserRouter } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import { checkAuthLoader } from './utils/http/admin/token';
import Admin from './layouts/admin';
import Members from './pages/Members';
import ErrorBlock from './components/ErrorBlock';

const router = createBrowserRouter([
    {
      path: 'admin',
      element: <Admin />,
      loader: checkAuthLoader,
      children: [
        {
          path: 'dashboard',
          element: <Dashboard />,
        },
        {
          path: 'members',
          element: <Members />,
        }
      ],
    },
    {
      path: 'admin/login',
      element: <Login />,
    },
    {
      path: '*',
      element: <ErrorBlock title={'Page not found.'} />,
    },
])

export default router