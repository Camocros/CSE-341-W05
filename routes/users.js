const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
const { validateUser } = require('../middleware/validate');

router.get('/', usersController.getAll);
router.get('/:id', usersController.getSingle);
router.post('/', validateUser, usersController.createUser);
router.put('/:id', validateUser, usersController.updateUser);
router.delete('/:id', usersController.deleteUser);

module.exports = router;
