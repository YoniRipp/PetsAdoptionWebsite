import { useEffect, useState, useContext } from 'react';
import { PetContext } from '../context/PetProvider';
import { Form, Button } from 'react-bootstrap';

const EditForm = ({ pet, setIsEdit }) => {
    
  const [type, setType] = useState(pet.type || '');
  const [name, setName] = useState(pet.name || '');
  const [adoptionStatus, setAdoptionStatus] = useState(pet.adoptionStatus || '');
  const [picture, setPicture] = useState(pet.picture || '');
  const [height, setHeight] = useState(pet.height || 0);
  const [weight, setWeight] = useState(pet.weight || 0);
  const [color, setColor] = useState(pet.color || '');
  const [bio, setBio] = useState(pet.bio || '');
  const [hypoallergenic, setHypoallergenic] = useState(pet.hypoallergenic || false);
  const [dietaryRestrictions, setDietaryRestrictions] = useState(pet.dietaryRestrictions || '');
  const [breed, setBreed] = useState(pet.breed || '');

  const { editPet } = useContext(PetContext);

  const handleEditPet = (e) => {
    e.preventDefault();

    const editedPet = {
      ...pet,
      type,
      name,
      adoptionStatus,
      picture,
      height,
      weight,
      color,
      bio,
      hypoallergenic,
      dietaryRestrictions,
      breed,
    };

    editPet(editedPet);
    setIsEdit(false);
  };

  return (
    <Form className='EditForm' onSubmit={handleEditPet}>
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
      <Form.Group controlId='petPicture'>
        <Form.Label>Picture</Form.Label>
        <Form.Control type='file' onChange={(e) => setPicture(e.target.files[0])} />
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
        <Form.Control type='text' value={color} onChange={(e) => setColor(e.target.value)}  />
      </Form.Group>
      <Form.Group controlId='petBio'>
        <Form.Label>Bio</Form.Label>
        <Form.Control as='textarea' value={bio} onChange={(e) => setBio(e.target.value)}  />
      </Form.Group>
      <Form.Group controlId='hypoallergenic'>
        <Form.Check type='checkbox' label='Hypoallergenic' checked={hypoallergenic} onChange={(e) => setHypoallergenic(e.target.checked)} />
      </Form.Group>
      <Form.Group controlId='dietaryRestrictions'>
        <Form.Label>Dietary Restrictions</Form.Label>
        <Form.Control type='text' value={dietaryRestrictions} onChange={(e) => setDietaryRestrictions(e.target.value)}  />
      </Form.Group>
      <Form.Group controlId='petBreed'>
        <Form.Label>Breed</Form.Label>
        <Form.Control type='text' value={breed} onChange={(e) => setBreed(e.target.value)}  />
      </Form.Group>
      <Button variant='success' type='submit' className='AddBtn'>
        Edit Pet
      </Button>
    </Form>
  );
};

export default EditForm;
