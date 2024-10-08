import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Element }) => {
  const token = localStorage.getItem('authToken');

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <Element />;
};

export default ProtectedRoute;
