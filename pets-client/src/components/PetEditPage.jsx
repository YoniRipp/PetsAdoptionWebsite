import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { PetContext } from '../context/PetProvider';
import EditForm from './EditForm';

const PetEditPage = () => {
  const { id } = useParams();
  const { getPetById } = useContext(PetContext);
  const [pet, setPet] = useState(null);

  useEffect(() => {
    const fetchPet = async () => {
      const res = await getPetById(id);
      setPet(res.data);
    };

    fetchPet();
  }, [id]);

  return (
    <Container>
      <h1>Edit Pet</h1>
      {pet ? <EditForm pet={pet} setIsEdit={() => {}} /> : <p>Loading...</p>}
    </Container>
  );
};

export default PetEditPage;
