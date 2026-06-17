import { createBrowserRouter } from 'react-router';
import NotFoundPage from '../pages/NotFoundPage';
import { ROUTES } from '../shared/constants/apiRoutes';
import RegisterPage from '../pages/RegisterPage';
import Layout from '../pages/Layout';
import VerifyEmailPage from '../pages/VerifyEmailPage';
import LoginPage from '../pages/LoginPage';
import UsersPage from '../pages/UsersPage';
import ProtectedRoute from '../components/ProtectedRoute';

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
