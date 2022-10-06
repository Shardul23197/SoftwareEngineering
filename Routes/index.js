const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');

// @desc    Login/Landing page
// @route   GET /
// must not be logged in to access
router.get('/', ensureGuest, (req, res) => {
    res.send('Login');
});

// @desc    Registration
// @route   GET /register
router.get('/register', ensureGuest, (req, res) => {
    res.send('Register');
});

// @desc    Dashboard
// @route   GET /dashboard
// must be logged in to access
router.get('/dashboard', ensureAuth, (req, res) => {
    res.send('Dashboard');
});

module.exports = router;