const express = require('express');
const router = express.Router();
const skillsController = require('../controllers/skills');
const { validateSkill } = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/auth');

router.get('/', skillsController.getAll);
router.get('/:id', skillsController.getSingle);
router.post('/', isAuthenticated, validateSkill, skillsController.createSkill);
router.put('/:id', isAuthenticated, validateSkill, skillsController.updateSkill);
router.delete('/:id', skillsController.deleteSkill);

module.exports = router;
