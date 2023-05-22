const express = require('express');
const User = require('../models/User');
const router = express.Router();
const {login , signup , updateUser} = require('../controllers/user');
const {authenticatedUser} = require('../middlewares/auth');
const {signup:signupJoi , login:loginJoi , editUser:editUserJoi} = require('../validators/user');

// signup
router.post('/api/signup'  , signupJoi , signup)

// login
router.post('/api/login' , loginJoi , login)

// edit a user
router.patch('/api/users/:userId' , authenticatedUser , editUserJoi , updateUser)


module.exports = router;
