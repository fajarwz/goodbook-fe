import { Navigate, createBrowserRouter } from 'react-router-dom';
import { checkAuthLoader } from './admin/utils/token';
import { checkAuthLoader as checkAuthLoaderMember } from './member/utils/token';
import { ErrorBlock } from './common/components';
import { Admin } from './admin/layouts';
import { Books, Dashboard, Login, Members, Reviews } from './admin/pages';
import { Home, SignIn } from './member/pages';
import { Browse, BrowseDetail } from './member/pages/browse';
import Join from './member/pages/Join';
import { MyBooks } from './member/pages/my';

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
    path: '/sign-in',
    element: <SignIn />,
  },
  {
    path: '/join',
    element: <Join />,
  },
  {
    path: '/browse',
    element: <Browse />,
  },
  {
    path: '/browse/:slug',
    element: <BrowseDetail />,
  },
  {
    path: '/my/books',
    element: <MyBooks />,
    loader: checkAuthLoaderMember,
  },
  {
    path: '*',
    element: <ErrorBlock title={'Page not found.'} />,
  },
])

export default router