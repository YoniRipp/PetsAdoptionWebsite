const Pet = require('../models/Pet'); // Adjust the path based on your actual model setup
const User = require('../models/User'); // Adjust the path based on your actual model setup

const getAllPetsModel = async () => {
  
  try {
    const allPets = await Pet.find();
    return allPets;
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
};

const addPetModel = async (newPet) => {
  try {
    const pet = await Pet.create(newPet);
    return pet;
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
};

const editPetModel = async (id, editedData) => {
  try {
    const editedPet = await Pet.findByIdAndUpdate(id, editedData, { new: true });
    return editedPet;
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
};

const getPetbyIDModel = async (id) => {
  try {
    const pet = await Pet.findById(id);
    return pet;
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
};

const searchPetModel = async (queryParams) => {
  try {
    const query = {};
    for (const key in queryParams) {
      if (queryParams[key]) {
        query[key] = queryParams[key];
      }
    }
    const pets = await Pet.find(query);
    return pets;
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
};

const adoptPetModel = async (id, userId, type) => {
  try {
    const updatedPet = await Pet.findByIdAndUpdate(
      id,
      { ownerId: userId, adoptionStatus: type === 'Adopt' ? 'Adopted' : 'Fostered' },
      { new: true }
    );
    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { ownedPets: id } }, 
      { new: true }
    );
    return updatedPet;
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
};

const returnPetModel = async (petId, userId) => {
  try {
    const updatedPet = await Pet.findByIdAndUpdate(
      petId,
      { ownerId: null, adoptionStatus: 'Available' },
      { new: true }
    );
    await User.updateOne(
      { _id: userId },
      { $pull: { ownedPets: petId } }
    );
    return updatedPet;
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
};

const savePetModel = async (petId, userId) => {
  try {
    const userUpdateResult = await User.updateOne(
      { _id: userId },
      { $addToSet: { savedPets: petId } }
    );
    const petUpdateResult = await Pet.updateOne(
      { _id: petId },
      { $addToSet: { savedBy: userId } }
    );

    if (userUpdateResult.nModified === 0 && petUpdateResult.nModified === 0) {
      throw new Error('User or Pet not found or already saved');
    }
    const updatedPet = await Pet.findById(petId);
    return updatedPet;
  } catch (error) {
    throw error;
  }
};
const unsavePetModel = async (petId, userId) => {
  try {
    const userUpdateResult = await User.updateOne(
      { _id: userId },
      { $pull: { savedPets: petId } }
    );
    const petUpdateResult = await Pet.updateOne(
      { _id: petId },
      { $pull: { savedBy: userId } }
    );
    if (userUpdateResult.nModified === 0 || petUpdateResult.nModified === 0) {
      throw new Error('User or Pet not found');
    }
    const updatedPet = await Pet.findById(petId);
    return updatedPet;
  } catch (error) {
    throw error;
  }
};
const getUsersPetsModel = async (id, type) => {
  try {
    // Log the inputs to ensure they are as expected
    

    // Find the user by ID and populate the relevant field based on type
    const user = await User.findById(id).populate(type === 'Owned' ? 'ownedPets' : 'savedPets');

    // Log the retrieved user document
   

    if (!user) {
      console.log('No user found');
      return []; // Return an empty array if no user is found
    }

    // Return the appropriate list of pets based on type
    const pets = type === 'Owned' ? user.ownedPets : user.savedPets;
   
    return pets;
  } catch (err) {
    console.error('Error in getUsersPetsModel:', err.message);
    throw new Error(err.message);
  }
};



module.exports = { getAllPetsModel, addPetModel, editPetModel, getPetbyIDModel, searchPetModel, adoptPetModel, returnPetModel ,savePetModel, unsavePetModel,getUsersPetsModel};
