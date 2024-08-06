import { useEffect, useState, useContext } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import PetList from '../components/PetList'
import { AuthContext } from '../context/AuthProvider';
import { PetContext } from '../context/PetProvider';

function MyPetsPage() {
  const { user} = useContext(AuthContext);
  const [petType, setPetType] = useState('Owned');
  const [loading, setLoading] = useState(true);
  const {getUsersPets,petList, setPetList } = useContext(PetContext);
  useEffect(() => {
    const fetchPets = async () => {
      try {
        await getUsersPets(user._id,petType)
        setLoading(false);
      } catch (err) {
        console.error('Error fetching pets', err);
        setLoading(false);
      }
    };

    fetchPets();
  }, [petType]);

  const handleToggle = () => {
    setPetType(petType === 'Owned' ? 'Saved' : 'Owned');
  };

  return (
    <Container>
     <div className='content'>
      <h1>My Pets Page</h1>
      <button onClick={handleToggle}>
        Show {petType === 'Owned' ? 'Saved' : 'Owned'} Pets
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : petList?.length === 0 ? (
        <p>You currently don't have any {petType.toLowerCase()} pets.</p>
      ) : (
        <PetList></PetList>
      )}
    </div>
    </Container>
  );
}

export default MyPetsPage;
