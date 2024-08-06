import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, requiredRole }) => {
  const { isLoggedIn, isUserLoading, user } = useContext(AuthContext);

  if (isUserLoading) {
    return <h1>Loading....</h1>;
  }

  if (!isLoggedIn) {
    return <Navigate to='/' />;
  }

  if (requiredRole && user?.isAdmin !== requiredRole) {
    return <Navigate to='/' />;
  }

  return <div>{children}</div>;
};

export default PrivateRoute;
