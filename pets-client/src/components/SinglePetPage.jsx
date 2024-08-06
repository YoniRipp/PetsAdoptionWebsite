import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap';
import { AuthContext } from '../context/AuthProvider';
import { PetContext } from '../context/PetProvider';

const SinglePetPage = () => {
  const { user } = useContext(AuthContext);
  const { savePet, unsavePet, adoptPet, fosterPet, returnPet, getPetById } = useContext(PetContext);
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
      returnPet(id);
      setPet({ ...pet, adoptionStatus: 'Available', ownerId: null });
      setIsOwner(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdoptPet = async () => {
    try {
      adoptPet(id, user._id);
      setPet({ ...pet, adoptionStatus: 'Adopted', ownerId: user._id });
      setIsOwner(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFosterPet = async () => {
    try {
      fosterPet(id, user._id);
      setPet({ ...pet, adoptionStatus: 'Fostered', ownerId: user._id });
      setIsOwner(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSavePet = async () => {
    try {
      if (!isSaved) {
        await savePet(id, user._id);
        setIsSaved(true);
      } else {
        await unsavePet(id, user._id);
        setIsSaved(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container className='PetContainer'>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <Card style={{ width: '100%' }}>
            <Card.Img variant="top" src={pet.imageUrl} alt={pet.name} />
            <Card.Body>
              <Card.Title><strong>Name: </strong>{pet.name}</Card.Title>
              
            </Card.Body>
            <ListGroup className="list-group-flush">
            <ListGroup.Item><strong>Type: </strong>{pet.type}</ListGroup.Item>
            <ListGroup.Item><strong>Adoption Status:</strong> {pet.adoptionStatus}</ListGroup.Item>
              <ListGroup.Item><strong>Height:</strong> {pet.height} cm</ListGroup.Item>
              <ListGroup.Item><strong>Weight:</strong> {pet.weight} kg</ListGroup.Item>
              <ListGroup.Item><strong>Color:</strong> {pet.color}</ListGroup.Item>
              <ListGroup.Item><strong>Bio:</strong> {pet.bio}</ListGroup.Item>
              <ListGroup.Item><strong>Hypoallergenic:</strong> {pet.hypoallergenic ? 'Yes' : 'No'}</ListGroup.Item>
              <ListGroup.Item><strong>Dietary Restrictions:</strong> {pet.dietaryRestrictions}</ListGroup.Item>
              <ListGroup.Item><strong>Breed:</strong> {pet.breed}</ListGroup.Item>
            </ListGroup>
            <Card.Body className="singleBtms">
              {isOwner ? (
                <Button variant="danger" onClick={handleReturnPet}>Return Pet</Button>
              ) : (
                <>
                  {pet.adoptionStatus === 'Fostered' && (
                    <Button variant="primary" onClick={handleAdoptPet}>Adopt Pet</Button>
                  )}
                  {pet.adoptionStatus === 'Available' && (
                    <>
                      <Button variant="primary" onClick={handleAdoptPet}>Adopt Pet</Button>
                      <Button variant="secondary" onClick={handleFosterPet}>Foster Pet</Button>
                    </>
                  )}
                </>
              )}
              <Button variant="info" onClick={handleSavePet}>
                {isSaved ? 'Unsave Pet' : 'Save Pet'}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SinglePetPage;
