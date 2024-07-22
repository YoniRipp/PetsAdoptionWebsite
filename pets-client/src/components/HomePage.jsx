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
      <h1>Welcome {user.firstName} {user.lastName} </h1>
      <PetForm></PetForm>
    </div>
    
  );
};

export default HomePage;
