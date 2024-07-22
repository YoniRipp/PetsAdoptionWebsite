import {useContext} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Pet from './Pet';
import { PetContext } from '../context/PetProvider';


const PetList = () => {
  const {petList} = useContext(PetContext)

  return (
    <Container>
      <Row>
        {petList.map((pet) => (
          <Col key={pet._id} md={4}>
            <Pet pet={pet} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PetList;
