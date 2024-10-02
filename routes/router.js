const express = require('express');
const router = express.Router();
const cantonController = require('../controllers/cantonController');

// Render login and registration pages
router.get('/', cantonController.login);
router.get('/register', cantonController.register);

// Handle login and registration POST requests
router.post('/login', cantonController.handleLogin);
router.post('/register', cantonController.handleRegister);

// Admin dashboard
router.get('/dashboard', cantonController.dashboard);

// User dashboard
router.get('/useradmin', cantonController.useradmin);

module.exports = router;
