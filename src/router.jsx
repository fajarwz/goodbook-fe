import { Navigate, createBrowserRouter } from 'react-router-dom';
import { checkAuthLoader } from './admin/utils/token';
import { ErrorBlock } from './common/components';
import { Admin } from './admin/layouts';
import { Books, Dashboard, Login, Members, Reviews } from './admin/pages';
import { Browse, Home } from './member/pages';

const router = createBrowserRouter([
  {
    path: 'admin',
    element: <Admin />,
    loader: checkAuthLoader,
    children: [
      {
        index: true,
        element: <Navigate to="/admin/dashboard" replace />,
        loader: checkAuthLoader,
      },
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
    path: '/browse',
    element: <Browse />,
  },
  {
    path: '*',
    element: <ErrorBlock title={'Page not found.'} />,
  },
])

export default router