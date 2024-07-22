import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { AuthContext } from '../context/AuthProvider';
import { PetContext } from '../context/PetProvider';

const SinglePetPage = () => {
  const { user} = useContext(AuthContext);
  const { savePet, unsavePet ,adoptPet, fosterPet,returnPet, getPetById} = useContext(PetContext);
  const [pet, setPet] = useState({});
  const [isOwner, setIsOwner] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchSinglePet = async () => {
      try {
        
        const res = await getPetById(id);
        setPet(res.data);
        setIsOwner(res.data.ownerId === user._id);
        setIsSaved(res.data.savedBy.includes(user._id));
      } catch (err) {
        console.log(err);
      }
    };
    fetchSinglePet();
  }, [id]);

  const handleReturnPet = async () => {
    try {
      returnPet(id)
      setPet({ ...pet, adoptionStatus: 'Available', ownerId: null });
      setIsOwner(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdoptPet = async () => {
    try {
      adoptPet(id,user._id)
      setPet({ ...pet, adoptionStatus: 'Adopted', ownerId: user._id });
      setIsOwner(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFosterPet = async () => {
    try {
      fosterPet(id,user._id)
      setPet({ ...pet, adoptionStatus: 'Fostered', ownerId: user._id });
      setIsOwner(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSavePet = async () => {
    try {
      if(!isSaved){
        await savePet(id, user._id)
        setIsSaved(true);
      }
      else{
        await unsavePet(id, user._id)
        setIsSaved(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
    <Container>
      <h1>{pet.name}</h1>
      <h3>{pet.type}</h3>
      <img className='imageUrl' src={pet.imageUrl} alt={pet.name} />
      <p><strong>Adoption Status:</strong> {pet.adoptionStatus}</p>
      <p><strong>Height:</strong> {pet.height} cm</p>
      <p><strong>Weight:</strong> {pet.weight} kg</p>
      <p><strong>Color:</strong> {pet.color}</p>
      <p><strong>Bio:</strong> {pet.bio}</p>
      <p><strong>Hypoallergenic:</strong> {pet.hypoallergenic ? 'Yes' : 'No'}</p>
      <p><strong>Dietary Restrictions:</strong> {pet.dietaryRestrictions}</p>
      <p><strong>Breed:</strong> {pet.breed}</p>
      {isOwner ? (
        <button onClick={handleReturnPet}>Return Pet</button>
      ) : (
        <>
          {pet.adoptionStatus === 'Fostered' && (
            <button onClick={handleAdoptPet}>Adopt Pet</button>
          )}
          {pet.adoptionStatus === 'Available' && (
            <>
              <button onClick={handleAdoptPet}>Adopt Pet</button>
              <button onClick={handleFosterPet}>Foster Pet</button>
            </>
          )}
        </>
      )}
      <button onClick={handleSavePet}>
        {isSaved ? 'Unsave Pet' : 'Save Pet'}
      </button>
    </Container>
  );
};

export default SinglePetPage;
