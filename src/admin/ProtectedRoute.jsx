import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Add your authentication logic here
  const isAuthenticated = localStorage.getItem('isAdmin'); // Example authentication check

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;