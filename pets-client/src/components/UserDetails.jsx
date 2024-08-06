import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Table } from 'react-bootstrap';
import { UserContext } from '../context/UserProvider';
import { PetContext } from '../context/PetProvider';

const UserDetails = () => {
  const { id } = useParams();
  const { getUserbyID } = useContext(UserContext);
  const { getUsersPets, petList } = useContext(PetContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUserbyID(id);
      setUser(userData);
      getUsersPets(id, 'Owned');
    };

    fetchData();
  }, [id]);

  return (
    <Container>
      <h1>User Details</h1>
      {user && (
        <>
          <h2>{user.firstName} {user.lastName}</h2>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Role:</strong> {user.isAdmin ? 'Admin' : 'User'}</p>
          <h3>Owned Pets</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Adoption Status</th>
              </tr>
            </thead>
            <tbody>
              {petList.map(pet => (
                <tr key={pet._id}>
                  <td>{pet.name}</td>
                  <td>{pet.type}</td>
                  <td>{pet.adoptionStatus}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
};

export default UserDetails;
