const express = require('express');
const PetsController = require('../controllers/petsController');
const { validateBody } = require('../middleware/validateBody');
const { petSchema } = require('../schemas/schemas');
const { auth } = require('../middleware/authMiddleware');
const { upload } = require('../middleware/imagesMiddleware');

const router = express.Router();

// GET pets based on search criteria (localhost:8080/pets/search)
router.get('/search', PetsController.searchPet);

// PUT update a pet by ID (localhost:8080/pets/:id)
router.put('/:id', validateBody(petSchema), auth, PetsController.editPet);

// GET all pets (localhost:8080/pets)
router.get('/', auth, PetsController.getAllPets);

// POST a new pet (localhost:8080/pets)
router.post('/', upload.single('imageUrl'), PetsController.addPet);

// GET a pet by ID (localhost:8080/pets/:id)
router.get('/:id', PetsController.getPetbyID);

// PUT adopt/foster a pet by ID (localhost:8080/pets/:id/adopt)
router.put('/:id/adopt', auth, PetsController.adoptPet);
// DELETE unsave a pet by ID (localhost:8080/pets/:id/unsave)
router.delete('/:id/unsave', auth, PetsController.unsavePet);
// DELETE return a pet by ID (localhost:8080/pets/:id/return)
router.delete('/:id/return', auth, PetsController.returnPet);

// PUT save a pet by ID (localhost:8080/pets/:id/save)
router.put('/:id/save', auth, PetsController.savePet);

router.get('/users/:id', PetsController.getUsersPets) 
module.exports = router;
