import { createBrowserRouter } from 'react-router';
import NotFoundPage from '../pages/NotFoundPage';
import RegisterPage from '../pages/RegisterPage';
import Layout from '../pages/Layout';
import VerifyEmailPage from '../pages/VerifyEmailPage';
import LoginPage from '../pages/LoginPage';
import UsersPage from '../pages/UsersPage';
import ProtectedRoute from '../components/ProtectedRoute';
import { ROUTES } from '../shared/constants';

const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    Component: Layout,
    children: [
      {
        path: ROUTES.USERS,
        element: (
          <ProtectedRoute>
            <UsersPage />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.REGISTER,
        Component: RegisterPage,
      },
      {
        path: ROUTES.LOGIN,
        Component: LoginPage,
      },
      {
        path: ROUTES.VERIFY,
        Component: VerifyEmailPage,
      },
    ],
  },
  {
    path: ROUTES.NOT_FOUND,
    Component: NotFoundPage,
  },
]);

export default router;
