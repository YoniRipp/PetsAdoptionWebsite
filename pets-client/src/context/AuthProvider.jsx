import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [user, setUser] = useState(null);

  const checkStatus = async () => {
    try {
      setIsUserLoading(true);
      const res = await axios.get('http://localhost:8080/users/check-status', { withCredentials: true });
      if (res.data.ok) {
        setUser({
          _id: res.data._id,
          email: res.data.email,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          isAdmin: res.data.isAdmin,
        });
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
      setIsUserLoading(false);
    } catch (err) {
      console.log(err);
      setIsUserLoading(false);
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ setIsLoggedIn, isLoggedIn, isUserLoading, user, setUser, checkStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export { AuthContext };
