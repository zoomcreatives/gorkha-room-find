
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Index = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Redirect to appropriate dashboard based on user role
  switch (user?.role) {
    case 'searcher':
      return <Navigate to="/searcher" replace />;
    case 'owner':
      return <Navigate to="/owner" replace />;
    case 'admin':
      return <Navigate to="/admin" replace />;
    default:
      return <Navigate to="/searcher" replace />;
  }
};

export default Index;
