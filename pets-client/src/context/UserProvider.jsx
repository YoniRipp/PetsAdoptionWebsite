import { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthProvider';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userList, setUserList] = useState([]);
  const { user } = useContext(AuthContext);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:8080/users',  { withCredentials: true });
      setUserList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addUser = async (newUser) => {
    try {
      const res = await axios.post('http://localhost:8080/users', newUser,{ withCredentials: true });
      const newUserList = [res.data, ...userList];
      setUserList(newUserList);
    } catch (err) {
      console.log(err);
    }
  };

  const editUser = async (id,editedUser) => {
    try {
      const res = await axios.put(`http://localhost:8080/users/${id}`, editedUser, { withCredentials: true });
      const newUserList = userList.map((user) => {
        if (user._id === res.data._id) {
          return res.data;
        } else {
          return user;
        }
      });

      setUserList(newUserList);
    } catch (err) {
      console.log(err);
    }
  };
  const getUserbyID = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8080/users/${id}`, { withCredentials: true });
      return res.data
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <UserContext.Provider value={{ userList, addUser, editUser, fetchUsers,getUserbyID }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
export { UserContext };
