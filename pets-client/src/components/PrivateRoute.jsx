import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { isLoggedIn, isUserLoading } = useContext(AuthContext);

  if (isUserLoading) {
    return <h1>Loading....</h1>;
  }

  return <div>{isLoggedIn ? children : <Navigate to='/' />}</div>;
};

export default PrivateRoute;
