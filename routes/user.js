const express = require('express');
const User = require('../models/User');
const router = express.Router();
const {login , signup , updateUser} = require('../controllers/user');
const {authenticatedUser} = require('../middlewares/auth');


// signup
router.post('/api/signup'  , signup )

// login
router.post('/api/login' , login)

// edit a user
router.patch('/api/users/:userId' , authenticatedUser , updateUser  )


module.exports = router;
