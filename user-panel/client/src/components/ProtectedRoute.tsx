import { Navigate } from 'react-router-dom';
import { ROUTES } from '../shared/constants/apiRoutes';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <>{children}</>;
}
