const { getAllPetsModel, addPetModel, editPetModel, getPetbyIDModel, searchPetModel, adoptPetModel, returnPetModel, savePetModel, unsavePetModel,getUsersPetsModel } = require('../models/petsModel');

const getAllPets = async (req, res) => {
  try {
    const pets = await getAllPetsModel();
    res.status(200).send(pets);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};

const addPet = async (req, res) => {
  req.body.imageUrl = req.file.path;
  try {
    const newPet = await addPetModel(req.body);
    res.status(201).send(newPet);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};

const editPet = async (req, res) => {
  try {
    const { id } = req.params;
    const editedPet = await editPetModel(id, req.body);
    res.status(200).send(editedPet);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};

const getPetbyID = async (req, res) => {
  try {
    const { id } = req.params;
    const pet = await getPetbyIDModel(id);
    res.status(200).send(pet);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};

const searchPet = async (req, res) => {
  try {
    const queryParams = req.query;
    const pets = await searchPetModel(queryParams);
    res.status(200).send(pets);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};
const adoptPet = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, type } = req.body;
    const updatedPet = await adoptPetModel(id, userId, type);
    res.status(200).send(updatedPet);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};
const returnPet = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPet = await returnPetModel(id, req.body._id);
    res.status(200).send(updatedPet);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};
const savePet = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPet = await savePetModel(id, req.body._id);
    res.status(200).send(updatedPet);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};
const unsavePet = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPet = await unsavePetModel(id, req.body._id);
    res.status(200).send(updatedPet);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};

const getUsersPets = async (req, res) => {
  try {
    const { id } = req.params;
    const { type } = req.query; 
    const pets = await getUsersPetsModel(id, type)
    res.status(200).send(pets);
  } catch (err) {
    console.error('Error in getUsersPets:', err.message);
    res.status(500).send(err.message);
  }
};

module.exports = { getAllPets, addPet, editPet, getPetbyID, searchPet, adoptPet, returnPet, savePet, unsavePet ,getUsersPets};
