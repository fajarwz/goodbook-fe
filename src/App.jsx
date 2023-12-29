import {
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

const router = createBrowserRouter([
  {
    path: 'admin',
    element: <Dashboard />,
  },
  {
    path: 'admin/login',
    element: <Login />,
  },
]);

function App() {
  return <RouterProvider router={router} />
}

export default App
