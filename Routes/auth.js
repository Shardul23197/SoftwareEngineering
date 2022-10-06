const express = require('express');
const passport = require('passport');
const { ensureGuest } = require('../middleware/auth');
const router = express.Router();

// @desc    Authenticate w/ Google
// @route   GET /auth/google
router.get('/google',
            ensureGuest, 
            passport.authenticate('google', { scope: ['profile'] }));

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get('/google/callback',
            ensureGuest,
            passport.authenticate('google', { scope: ['profile', 'email'], failureRedirect:'/' }), 
            (req, res) => {
                res.redirect('/dashboard');
            }
);

// @desc    Logout user
// @route   GET /auth/logout
// change to post
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        res.redirect('/');
    });
});

module.exports = router;

