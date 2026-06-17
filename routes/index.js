const express = require('express');
const router = express.Router();


router.use('/users', require('./users'));
router.use('/projects', require('./projects'));

module.exports = router;
