const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const util = require('util');
const { ensureGuest } = require('../middleware/auth');
const jwtRequired = passport.authenticate('jwt', { session: false });
const RefreshToken = require('../models/RefreshToken');

// @desc    Authenticate w/ Google
// @route   GET /auth/google
router.get('/google',
            // ensureGuest, 
            passport.authenticate('google', { scope: ['profile', 'email'] }));

// @desc    Google auth callback
// @route   GET /auth/google/callback
// rediredt user to React dashboard page
router.get('/google/callback',
            // ensureGuest,
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
                if (err) res.status(400).json(err);
                    
                try {
                    // If the user isn't found log the error and return it
                    if (err || !user) {
                        return next(err);
                    }

                    const email = user.email; // store the user's eamil for easy access

                    let alreadyHasSession = false;
                    // If the user already has a refresh token in the db
                    // return their current access token 
                    await RefreshToken.findOne({ email: email }).exec()
                        .then((refreshTokenObj) => {
                            console.log(`found refreshTokenObj: ${JSON.stringify(refreshTokenObj)}`)
                            if (refreshTokenObj) {
                                alreadyHasSession = true;

                                const refreshToken = refreshTokenObj.refreshToken;
                                const accessToken = refreshTokenObj.accessToken;
                                // Return the token
                                res.status(200).json({
                                    accessToken,
                                    refreshToken
                                });
                            }
                        })
                        .catch((err) => {

                        }
                    );
            
                    // If the email is not found in a current refresh token db entry, make a new one
                    // and send it
                    if (!alreadyHasSession) {

                        // Generate an access token
                        const body = { _id: user._id, email: email };
                        console.log(`body: ${JSON.stringify(body)}`)
                        const accessToken = jwt.sign(body, process.env.JWT_SECRET_KEY, { expiresIn: '20m'});
                        const refreshToken = jwt.sign(body, process.env.JWT_REFRESH_KEY);
                        console.log(`accessToken: ${accessToken}`)
                        console.log(`refreshToken: ${accessToken}`)

                        
                        // Save the refreshToken and it's associated info
                        const refreshTokenObj = new RefreshToken({
                            email: email,
                            accessToken: accessToken,
                            refreshToken: refreshToken 
                        });
                        await refreshTokenObj
                            .save()
                            .then((doc) => {
                                // Return the token
                                res.status(200).json({
                                    accessToken, 
                                    refreshToken
                                });
                            })
                            .catch(err => { 
                                console.error(err);
                                res.status(500).json('Could not save refresh JWT!');
                            }
                        );
                    }
                } catch (err) {
                    res.status(500).json('Could not issue JWT!');
                }
            }
        )(req, res, next);
    }
);

// @route POST /auth/token
// @desc create a new access token for the user
// @access Public
router.post('/token', 
    async (req, res, next) => {
        // Get the access token from the body
        const refreshValue = req.body.refreshToken;
        const refreshToken = refreshValue.split(' ')[1];

        // If they didn't send a token, send unauthorized response code
        if (!refreshToken) {
            return res.sendStatus(401);
        }

        // Find the refresh token in the db
        await RefreshToken.findOne({ refreshToken: refreshToken }).exec()
            .then((refreshTokenObj) => {

                if (!refreshTokenObj) {
                    res.sendStatus(403);
                    return;
                }
            
                // Verify the refresh token is correct
                try {    
                    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, async (err, user) => {
                        if (err) res.sendStatus(403);
                
                        // Generate a new access token from the refresh token
                        const accessToken = jwt.sign(
                            { 
                                _id: user._id, 
                                username: user.username 
                            }, 
                            process.env.JWT_SECRET_KEY, 
                            { expiresIn: '20m' }
                        );
                        // Remove the old refresh token entry in the db
                        await RefreshToken
                            .findByIdAndRemove({ _id: refreshTokenObj._id })
                            .catch(err => { 
                                console.error(err);
                                res.status(500).json('Could not delete old token!');
                            });
        
                        // Make new refresh token entry
                        const newRefreshTokenObj = new RefreshToken({
                            email: refreshTokenObj.email,
                            accessToken: accessToken,
                            refreshToken: refreshToken
                        })
                        // Put new entry in db and error if there is an issue
                        await newRefreshTokenObj
                            .save()
                            .then((doc) => {
                                res.status(200).json({
                                    accessToken
                                });
                            })
                            .catch(err => { 
                                console.error(err);
                                res.status(500).json('Could not save refresh JWT!');
                            });
                    });
                } catch (err) {
                    res.sendStatus(500);
                }
            })
            .catch((err) => {
                res.sendStatus(403);
            });
    }
);

// @desc    Logout user
// @route   GET /api/users/logout
// rediredt user to React login page
// change to post
router.post('/logout', 
    (req, res, next) => {
        // Get the access token from the header
        const authHeader = req.headers.authorization;
        const accessToken = authHeader.split(' ')[1];

        // Verify the jwt with passport
        passport.authenticate(
            'jwt',
            { session: false },
            (err, token) => {
                // Remove the refresh token entry from the db
                RefreshToken.findOneAndRemove({ accessToken: accessToken }, (err, doc) => {
                    if (!doc)
                        res.status(500).json(`User was not logged in!`);

                    if (err)
                        res.status(500).json(`Could not log out user with access token: ${accessToken}`);
                    else
                        res.status(200).json('Logout sucessful!');
                });
            }
        )(req, res, next);
    }
);

router.get('/current-session', 
    (req, res, next) => {
        passport.authenticate(
            'jwt',
            { session: false },
            (err, token) => {
                if (err || !token)
                    res.send(false)
                else
                    res.send(token);
            }
        )(req, res, next);
    }
);

module.exports = router;

