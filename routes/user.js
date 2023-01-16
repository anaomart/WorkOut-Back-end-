const express = require('express');
const { loginUser, SignupUser } = require('../controllers/user.controller');

const router = express.Router();

//login 
router.post('/login', loginUser)

router.post('/signup', SignupUser)

module.exports = router;