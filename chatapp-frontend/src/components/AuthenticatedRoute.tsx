import { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../utils/hooks/useAuth';

export const AuthenticatedRoute: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div>Loading...</div>;

  if (user) return <>{children}</>;

  return <Navigate to="/login" state={{ from: location }} replace />;
};
