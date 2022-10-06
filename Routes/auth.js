const express = require('express');
const router = express.Router();
const passport = require('passport');
const { ensureGuest } = require('../middleware/auth');

// @desc    Authenticate w/ Google
// @route   GET /auth/google
router.get('/google',
            ensureGuest, 
            passport.authenticate('google', { scope: ['profile'] }));

// @desc    Google auth callback
// @route   GET /auth/google/callback
// rediredt user to React dashboard page
router.get('/google/callback',
            ensureGuest,
            passport.authenticate('google', { scope: ['profile', 'email'], failureRedirect:'/' }), 
            (req, res) => {
                res.redirect('http://localhost:3000/dashboard');
            }
);

// moved to ./api/users
// // @desc    Logout user
// // @route   GET /auth/logout
// // rediredt user to React login page
// // change to post
// router.get('/logout', (req, res) => {
//     req.logout((err) => {
//         if (err) {
//             console.error(err);
//             process.exit(1);
//         }
//         res.redirect('http://localhost:3000/login');
//     });
// });

module.exports = router;

