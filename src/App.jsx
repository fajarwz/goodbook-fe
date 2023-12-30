import {
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from './utils/http/admin/auth';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import { checkAuthLoader } from './utils/http/admin/token';
import Admin from './layouts/admin';
import Members from './pages/Members';

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
]);

function App() {
  return <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
}

export default App
