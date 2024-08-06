import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthProvider';

const Nav = () => {
  const { isLoggedIn, setIsLoggedIn, user, isUserLoading, setUser } = useContext(AuthContext);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (!isUserLoading) {
      setShouldRender(true);
    }
  }, [isUserLoading, isLoggedIn, user]);

  const handleLogOut = async () => {
    try {
      const res = await axios.get('http://localhost:8080/users/logout', { withCredentials: true });
      if (res.data.ok) {
        setIsLoggedIn(false);
        setUser(null);
        setShouldRender(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (!shouldRender) {
    return null;
  }

  return (
    <div className='NavContainer'>
      <Link to='/home'>Home</Link>
      <Link to='/pets/search'>Search</Link>
      {!isLoggedIn ? (
        <>
          <Link to='/signup'>Sign Up</Link>
          <Link to='/'>Login</Link>
        </>
      ) : (
        <>
          {user?._id && <Link to={`pets/users/${user._id}`}>My Pets</Link>}
          {user?._id && <Link to={`/users/${user._id}`}>Profile Settings</Link>}
          {user?.isAdmin && <Link to='/dashboard'>Dashboard</Link>} {/* Add link to dashboard for admin users */}
          {user?.isAdmin && <Link to='/pets'>Add Pet</Link>} {/* Add link to dashboard for admin users */}
          <button onClick={handleLogOut}>Log Out</button>
        </>
      )}
    </div>
  );
};

export default Nav;
