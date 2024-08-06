import React, { useEffect, useContext, useState } from 'react';
import { Table, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';
import { PetContext } from '../context/PetProvider';

const Dashboard = () => {
  const { fetchUsers, userList } = useContext(UserContext);
  const { fetchPets, petList } = useContext(PetContext);
  const [userMap, setUserMap] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await fetchUsers();
      await fetchPets();
    };

    fetchData();
  }, []);

  useEffect(() => {
    const mapUsersById = {};
    userList.forEach(user => {
      mapUsersById[user._id] = `${user.firstName} ${user.lastName}`;
    });
    setUserMap(mapUsersById);
  }, [userList]);

  const handleEditClick = (petId) => {
    navigate(`/pets/${petId}/edit`);
  };

  return (
    <Container className="dashboard">
      <h1>Dashboard</h1>
      <Row>
        <Col>
          <h2>Users</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userList.map(user => (
                <tr key={user._id}>
                  <td>{user.firstName} {user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? 'Admin' : 'User'}</td>
                  <td>
                    <Button
                      variant='primary'
                      onClick={() => navigate(`/users/${user._id}`)}
                    >
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Pets</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Adoption Status</th>
                <th>Owner</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {petList.map(pet => (
                <tr key={pet._id}>
                  <td>{pet.name}</td>
                  <td>{pet.type}</td>
                  <td>{pet.adoptionStatus}</td>
                  <td>{userMap[pet.ownerId] || 'N/A'}</td>
                  <td>
                    <Button
                      variant='primary'
                      onClick={() => handleEditClick(pet._id)}
                    >
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
