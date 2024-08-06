import React, { useState, useContext } from 'react';
import { PetContext } from '../context/PetProvider';
import { Form, Button, Container } from 'react-bootstrap';

const PetForm = () => {
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [adoptionStatus, setAdoptionStatus] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [color, setColor] = useState('');
  const [bio, setBio] = useState('');
  const [hypoallergenic, setHypoallergenic] = useState(false);
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [breed, setBreed] = useState('');

  const { addPet } = useContext(PetContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const petData = new FormData();
    petData.append('type', type);
    petData.append('name', name);
    petData.append('adoptionStatus', adoptionStatus);
    petData.append('imageUrl', imageFile); 
    petData.append('height', height);
    petData.append('weight', weight);
    petData.append('color', color);
    petData.append('bio', bio);
    petData.append('hypoallergenic', hypoallergenic);
    petData.append('dietaryRestrictions', dietaryRestrictions);
    petData.append('breed', breed);

    addPet(petData);

    setType('');
    setName('');
    setAdoptionStatus('');
    setImageFile(null);
    setHeight(0);
    setWeight(0);
    setColor('');
    setBio('');
    setHypoallergenic(false);
    setDietaryRestrictions('');
    setBreed('');
  };

  return (
    <Container>
    <Form onSubmit={handleSubmit} >
      <h1>Add Pet Form</h1>
      <Form.Group controlId='petType'>
        <Form.Label>Type</Form.Label>
        <Form.Control as='select' value={type} onChange={(e) => setType(e.target.value)} required>
          <option value='' disabled>Select Type</option>
          <option value='Dog'>Dog</option>
          <option value='Cat'>Cat</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId='petName'>
        <Form.Label>Name</Form.Label>
        <Form.Control type='text' value={name} onChange={(e) => setName(e.target.value)} required />
      </Form.Group>
      <Form.Group controlId='adoptionStatus'>
        <Form.Label>Adoption Status</Form.Label>
        <Form.Control as='select' value={adoptionStatus} onChange={(e) => setAdoptionStatus(e.target.value)} required>
          <option value='' disabled>Select status</option>
          <option value='Adopted'>Adopted</option>
          <option value='Fostered'>Fostered</option>
          <option value='Available'>Available</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId='imageUrl'>
        <Form.Label>Picture</Form.Label>
        <Form.Control type='file' onChange={(e) => setImageFile(e.target.files[0])} />
      </Form.Group>
      <Form.Group controlId='petHeight'>
        <Form.Label>Height</Form.Label>
        <Form.Control type='number' value={height} onChange={(e) => setHeight(parseFloat(e.target.value))} required />
      </Form.Group>
      <Form.Group controlId='petWeight'>
        <Form.Label>Weight</Form.Label>
        <Form.Control type='number' value={weight} onChange={(e) => setWeight(parseFloat(e.target.value))} required />
      </Form.Group>
      <Form.Group controlId='petColor'>
        <Form.Label>Color</Form.Label>
        <Form.Control type='text' value={color} onChange={(e) => setColor(e.target.value)} />
      </Form.Group>
      <Form.Group controlId='petBio'>
        <Form.Label>Bio</Form.Label>
        <Form.Control as='textarea' value={bio} onChange={(e) => setBio(e.target.value)} />
      </Form.Group>
      <Form.Group controlId='hypoallergenic'>
        <Form.Check type='checkbox' label='Hypoallergenic' checked={hypoallergenic} onChange={(e) => setHypoallergenic(e.target.checked)} />
      </Form.Group>
      <Form.Group controlId='dietaryRestrictions'>
        <Form.Label>Dietary Restrictions</Form.Label>
        <Form.Control type='text' value={dietaryRestrictions} onChange={(e) => setDietaryRestrictions(e.target.value)} />
      </Form.Group>
      <Form.Group controlId='petBreed'>
        <Form.Label>Breed</Form.Label>
        <Form.Control type='text' value={breed} onChange={(e) => setBreed(e.target.value)} />
      </Form.Group>
      <Button variant='primary' type='submit' className='AddBtn'>
        Add Pet
      </Button>
    </Form>
    </Container>
  );
};

export default PetForm;
