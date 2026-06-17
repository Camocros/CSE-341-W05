const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projects');
const { validateProject } = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/auth');

router.get('/', projectsController.getAll);
router.get('/:id', projectsController.getSingle);
router.post('/', isAuthenticated, validateProject, projectsController.createProject);
router.put('/:id', isAuthenticated, validateProject, projectsController.updateProject);
router.delete('/:id', projectsController.deleteProject);

module.exports = router;
