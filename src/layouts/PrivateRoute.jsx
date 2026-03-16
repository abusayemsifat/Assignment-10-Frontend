import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../context/useAuth';

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { user, dbUser, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate to="/login" state={{ from: location.pathname }} replace />
    );
  }

  if (adminOnly && dbUser?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PrivateRoute;