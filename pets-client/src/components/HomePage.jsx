import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import PetForm from './PetForm';

const HomePage = () => {
  const { user, isUserLoading } = useContext(AuthContext);

  if (isUserLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className='container'>
      <div className='content'>
        <h1>Welcome {user.firstName} {user.lastName}</h1>
        <h4>Search and Adopt a pet</h4>
      </div>
    </div>
  );
};

export default HomePage;
