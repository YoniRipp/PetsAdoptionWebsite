import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Signup from './components/Signup';
import Nav from './components/Nav';
import PetProvider from './context/PetProvider';
import UserProvider from './context/UserProvider';
import AuthProvider from './context/AuthProvider';
import PrivateRoute from './components/PrivateRoute';
import SinglePetPage from './components/SinglePetPage';
import SearchPage from './components/SearchPage';
import MyPetsPage from './components/MyPetsPage';
import ProfileSettings from './components/ProfileSettings';
import Dashboard from './components/Dashboard';
import PetEditPage from './components/PetEditPage';
import PetForm from './components/PetForm';

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <PetProvider>
          <div>
            <Nav />
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/home' element={<PrivateRoute><HomePage /></PrivateRoute>} />
              <Route path='/pets/:id' element={<PrivateRoute><SinglePetPage /></PrivateRoute>} />
              <Route path='/pets/search' element={<SearchPage />} />
              <Route path='/pets/users/:id' element={<PrivateRoute><MyPetsPage /></PrivateRoute>} />
              <Route path='/users/:id' element={<PrivateRoute><ProfileSettings /></PrivateRoute>} />
              <Route path='/dashboard' element={<PrivateRoute requiredRole={true}><Dashboard /></PrivateRoute>} />
              <Route path='/pets/:id/edit' element={<PrivateRoute requiredRole={true}><PetEditPage /></PrivateRoute>} />
              <Route path='/pets/' element={<PrivateRoute requiredRole={true}><PetForm /></PrivateRoute>} />
            </Routes>
          </div>
        </PetProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
