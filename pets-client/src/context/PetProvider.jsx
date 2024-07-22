import { useState, createContext, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthProvider';

const PetContext = createContext();

const PetProvider = ({ children }) => {
  const [petList, setPetList] = useState([]);
  const { userToken } = useContext(AuthContext);

  const fetchPets = async () => {
    try {
      const res = await axios.get('http://localhost:8080/pets', { withCredentials: true });
      setPetList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getPetById = async (id) => {
    try {
      return await axios.get(`http://localhost:8080/pets/${id}`, { withCredentials: true });
    } catch (err) {
      console.log(err);
    }
  };

  const addPet = async (newPet) => {
    try {
      const res = await axios.post('http://localhost:8080/pets', newPet, { withCredentials: true });
      const newPetsList = [res.data, ...petList];
      setPetList(newPetsList);
    } catch (err) {
      console.log(err);
    }
  };
  
  const editPet = async (editedPet) => {
    try {
      const res = await axios.put(`http://localhost:8080/pets/${editedPet._id}`, editedPet, { withCredentials: true });
      const newPetsList = petList.map((pet) => (pet._id === res.data._id ? res.data : pet));
      setPetList(newPetsList);
    } catch (err) {
      console.log(err);
    }
  };

  const searchPets = async (searchParams) => {
    try {
      const queryParams = new URLSearchParams(searchParams).toString();
      const res = await axios.get(`http://localhost:8080/pets/search?${queryParams}`, { withCredentials: true });
      console.log(res.data)
      setPetList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const savePet = async (petId ,userId) => {
    try {
        await axios.put(`http://localhost:8080/pets/${petId}/save`,  userId, { withCredentials: true });
        console.log('Pet saved successfully');
      }
     catch (err) {
      console.log(err);
    }
  };

  const unsavePet = async (petId, userId) => {
    try {
        await axios.delete(`http://localhost:8080/pets/${petId}/unsave`, {
             userId ,
            withCredentials: true
        });
        console.log('Pet unsaved successfully');
    } catch (err) {
        console.log('Error unsaving pet', err);
    }
};

const fosterPet = async (id, userId) => {
  try {
      await axios.put(`http://localhost:8080/pets/${id}/adopt`,  { userId, type: 'Foster' }, { withCredentials: true });
      console.log('Pet Fostered successfully');
  } catch (err) {
      console.log('Error Fostering pet', err);
  }
};

const adoptPet = async (id, userId) => {
  try {
      await axios.put(`http://localhost:8080/pets/${id}/adopt`,  { userId, type: 'Adopt' }, { withCredentials: true });
      console.log('Pet Adopted successfully');
  } catch (err) {
      console.log('Error Adopting pet', err);
  }
};

const returnPet = async (id) => {
  try {
      await axios.delete(`http://localhost:8080/pets/${id}/return`, {withCredentials: true});
      console.log('Pet retuned successfully');
  } catch (err) {
      console.log('Error returning pet', err);
  }
};

const getUsersPets = async (id, petType) => {
  try {
    
    const res = await axios.get(`http://localhost:8080/pets/users/${id}`, {
      params: { type: petType },
      withCredentials: true,
    });
    setPetList(res.data);
    
  } catch (err) {
    console.log('Error returning pet', err);
  }
};
  return (
    <PetContext.Provider value={{ setPetList, petList, addPet, editPet, searchPets, fetchPets ,savePet, unsavePet, adoptPet,fosterPet,returnPet, getPetById,getUsersPets}}>
      {children}
    </PetContext.Provider>
  );
};

export default PetProvider;
export { PetContext };
