const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { ensureGuest } = require('../middleware/auth');
const jwtRequired = passport.authenticate('jwt', { session: false });

// @desc    Authenticate w/ Google
// @route   GET /auth/google
router.get('/google',
            ensureGuest, 
            passport.authenticate('google', { scope: ['profile', 'email'] }));

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

// @route POST /auth/login
// @desc begin passport custom auth process
// @access Public
router.post('/login', 
    async (req, res, next) => {
        // Authenticate the user using passport
        passport.authenticate('login', 
            async (err, user) => {
                try {
                    // If the user isn't found log the error and return it
                    if (err || !user) {
                        console.error(err);
                        return next(err);
                    }

                    // If the user is found and verified log them in
                    req.login(user,
                        // { session: false }, // remove for sessions?
                        async (err) => {
                            if (err) return next(err);
            
                            // Create a JWT for the user
                            const body = { _id: user._id, email: user.email };
                            const token = jwt.sign({ user: body }, process.env.JWT_SECRET_KEY);
                            
                            // req.session.jwt = token;
                            return res.status(200).json({ token }).req.session.jwt = token;
                        }
                    );
                } catch (err) {
                    return next(err);
                }
            }
        )(req, res, next);
    }
);

// @desc    Logout user
// @route   GET /api/users/logout
// rediredt user to React login page
// change to post
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        res.redirect('http://localhost:3000/login');
    });
});

router.get('/current-session', 
    (req, res, next) => {
        passport.authenticate(
            'jwt',
            { session: false },
            (err, user) => {
                if (err || !user)
                    res.send(false)
                else
                    res.send(user);
            }
        )(req, res, next);
    }
);

module.exports = router;

