import React, { useState, useContext } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { PetContext } from '../context/PetProvider';
import PetList from './PetList';

const SearchPage = () => {
  const { searchPets, petList } = useContext(PetContext);
  const [searchCriteria, setSearchCriteria] = useState({
    adoptionStatus: '',
    type: '',
    height: '',
    weight: '',
    name: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria({ ...searchCriteria, [name]: value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    await searchPets(searchCriteria);
  };

  return (
    <Container>
      <h2>Search Pets</h2>
      <Form onSubmit={handleSearch}>
        <Form.Group controlId="adoptionStatus">
          <Form.Label>Adoption Status</Form.Label>
          <Form.Control
            as="select"
            name="adoptionStatus"
            value={searchCriteria.adoptionStatus}
            onChange={handleInputChange}
          >
            <option value="" disabled>Select status</option>
            <option value="Adopted">Adopted</option>
            <option value="Fostered">Fostered</option>
            <option value="Available">Available</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="type">
          <Form.Label>Type</Form.Label>
          <Form.Control
            as="select"
            name="type"
            value={searchCriteria.type}
            onChange={handleInputChange}
          >
            <option value="" disabled>Select Type</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="height">
          <Form.Label>Height</Form.Label>
          <Form.Control
            type="text"
            name="height"
            value={searchCriteria.height}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="weight">
          <Form.Label>Weight</Form.Label>
          <Form.Control
            type="text"
            name="weight"
            value={searchCriteria.weight}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={searchCriteria.name}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>

      <PetList /> 
      </Container>

  );
};

export default SearchPage;
