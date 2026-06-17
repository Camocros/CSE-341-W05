const express = require('express');
const router = express.Router();
const experiencesController = require('../controllers/experiences');
const { validateExperience } = require('../middleware/validate');

router.get('/', experiencesController.getAll);
router.get('/:id', experiencesController.getSingle);
router.post('/', validateExperience, experiencesController.createExperience);
router.put('/:id', validateExperience, experiencesController.updateExperience);
router.delete('/:id', experiencesController.deleteExperience);

module.exports = router;
