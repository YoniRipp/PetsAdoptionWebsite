import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

const Pet = ({ pet }) => {
  const navigate = useNavigate();

  return (
    <Card className='petContainer'>
      <Card.Img variant='top' src={pet?.imageUrl} alt={pet?.name} />
      <Card.Body>
        <Card.Title style={{ marginBottom: '1rem' }}>Name: {pet?.name}</Card.Title>
        <Card.Text>Type: {pet?.type}</Card.Text>
        <Card.Text>Adoption Status: {pet?.adoptionStatus}</Card.Text>
        <Button
          variant='primary'
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/pets/${pet._id}`);
          }}
          style={{ marginTop: '1rem' }}
        >
          See More
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Pet;
