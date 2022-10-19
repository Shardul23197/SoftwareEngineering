const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const url = require('url');
const util = require('util');
const RefreshToken = require('../models/RefreshToken');

// Makes a new RefreshToken for the user if there isn't
// one in the database already
const getRefreshToken = async (_id, email, done) => {
    
    let refreshTokenObj = undefined;
    // If the user already has a refresh token in the db
    // return their current access token 
    await RefreshToken.findOne({ email: email })
        .exec()
        .then((doc) => {
            refreshTokenObj = doc;
            // console.log(`found doc: ${JSON.stringify(doc)}`);
        })
        .catch((err) => {
            console.error(err);
            done('Could not use the given email to search for a refresh token!');
        }
    );

    if (refreshTokenObj) {
        done(null, refreshTokenObj);
        return;
    }

    // Generate an access token
    const body = { _id: _id, email: email };
    const accessToken = jwt.sign(body, process.env.JWT_SECRET_KEY, { expiresIn: '20m'});
    const refreshToken = jwt.sign(body, process.env.JWT_REFRESH_KEY);
    // console.log(`body: ${JSON.stringify(body)}`)
    // console.log(`accessToken: ${accessToken}`)
    // console.log(`refreshToken: ${accessToken}`)

    // Save the refreshToken and its associated info
    new RefreshToken({
        email: email,
        accessToken: accessToken,
        refreshToken: refreshToken 
    }).save()
        .then((doc) => {
            // Return the token
            done(null, doc);
        })
        .catch(err => { 
            console.error(err);
            done('Could not save refresh JWT!');
        }
    );
};

// @desc    Authenticate w/ Google
// @route   GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// @desc    Google auth callback
// @route   GET /auth/google/callback
// rediredt user to React dashboard page
router.get('/google/callback',
    async (req, res, next) => {
        passport.authenticate(
            'google', 
            { 
                scope: ['profile', 'email'], 
                failureRedirect:'http://localhost:3000/login' 
            },
            async (err, user) => {
                // console.log(`/google/callback user ${JSON.stringify(user)}`);
                if (err) 
                    res.redirect('http://localhost:3000/login');
                else {

                    // Get a refresh token and access token for the user
                    getRefreshToken(user._id, user.email, (err, refreshTokenObj) => {
                        // console.log(`getRefreshToken-cb err ${err}`);
                        // console.log(`getRefreshToken-cb refreshTokenObj ${JSON.stringify(refreshTokenObj)}`);
                        if (err) {
                            res.redirect('http://localhost:3000/login');
                        }
                        else {
                            const refreshToken = refreshTokenObj.refreshToken;
                            const accessToken = refreshTokenObj.accessToken;
                            // Return the tokens
                            let dashboardUrl = url.format({
                                protocol: 'http',
                                host: 'localhost:3000',
                                pathname: '/dashboard',
                                query: {
                                    authToken: accessToken,
                                    refreshToken: refreshToken           
                                }
                            })
                            // console.log(`dashboardUrl: ${dashboardUrl}`);
                            res.redirect(dashboardUrl);
                        }
                    });
                }
            }
        )(req, res, next);
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
                if (err) {
                    res.status(400).json(err);
                }
                    
                try {
                    // If the user isn't found log the error and return it
                    if (err || !user) {
                        return next(err);
                    }

                    const _id = user._id; // store the user's _id for easy access
                    const email = user.email; // store the user's eamil for easy access

                    // Get a refresh token and access token for the user
                    getRefreshToken(_id, email, (err, refreshTokenObj) => {
                        if (err)
                            res.status(500).json(err);
                        else {
                            const refreshToken = refreshTokenObj.refreshToken;
                            const accessToken = refreshTokenObj.accessToken;
                            // Return the tokens
                            res.status(200).json({
                                accessToken,
                                refreshToken
                            });
                        }
                    });
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

// @route   POST /auth/logout
// @desc    Logout user
// removes user's refresh token entry from the db
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
                    else if (err)
                        res.status(500).json(`Could not log out user with access token: ${accessToken}`);
                    else
                        res.status(200).json('Logout sucessful!');
                });
            }
        )(req, res, next);
    }
);

// @route POST /auth/register
// @desc Register user
// @access Public
router.post("/register",
    (req, res, next) => {
        passport.authenticate(
            'register',
            { session: false },
            (err, user) => {
                try {
                    // If the user wasn't created log the error and return it
                    if (err || !user) {
                        res.status(400).json(err);
                        return;
                    }

                    const _id = user._id; // store the user's _id for easy access
                    const email = user.email; // store the user's eamil for easy access

                    // Get a refresh token and access token for the user
                    getRefreshToken(_id, email, (err, refreshTokenObj) => {
                        if (err)
                            res.status(500).json(err);
                        else {
                            const refreshToken = refreshTokenObj.refreshToken;
                            const accessToken = refreshTokenObj.accessToken;
                            // Return the tokens
                            res.status(200).json({
                                accessToken,
                                refreshToken
                            });
                        }
                    });
                } catch (err) {
                    console.error(err);
                    res.status(500).json('Could not issue JWT!');
                }
            }
        )(req, res, next);
    }
);

// router.post("/")

module.exports = router;

