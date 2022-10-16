const passportCustom = require('passport-custom');
const CustomStrategy = passportCustom.Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');
const GoogleUser = require('../models/GoogleUser');
const util = require('util');

module.exports = (passport) => {
    // Passport custom login strategy
    passport.use('login', new CustomStrategy(
        async (req, done) => {
            const email = req.body.email;
            const password = req.body.password;

            // Find user by email
            const user = await User.findOne({ email: email });

            // Check if user exists
            if (!user) {
                // Call passport's callback for error
                done('Could not find the given email!');
                return;
            }

            // Ensure the user is not a google user. If they are,
            // send error stating they need to sign in w/ google
            if (user.googleId) {
                // Call passport's callback for error
                done('Please sign in using your google account!');
                return;
            }

            // Check the user's password
            user.isValidPassword(password)
                .then((isValid) => {
                    // if the password is valid, return the user
                    if (isValid)
                        done(null, user);
                    else {
                        // Otherwise return an error
                        done('Invaild password!');
                    }
                })
                .catch((err) => {
                    console.error(err);
                    done(err);
                })
        }
    ))

    // Passport custom register strategy
    passport.use(
        'register',
        new CustomStrategy(
            async (req, done) => {
                const email = req.body.email;
                const user = await User.findOne({ email: email });
                if (user) {
                    done('Email already exists!');
                    return;
                }

                new User({
                    username: req.body.username,
                    name: req.body.name,
                    email: email,
                    password: req.body.password
                }).save()
                    .then((doc) => {
                        done(null, doc);
                    })
                    .catch((err) => {
                        console.error(err);
                        done(err);
                    });
            }
        ))

    // Passport Google auth strategy
    passport.use('google',
        new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback'
        },
        async (accessToken, refreshToken, profile, done) => {
            let googleId = profile.id;
            try {
                // Try to find a googleuser in the DB by their googleID
                await GoogleUser.findOne({ googleId: googleId }).exec()
                    .then(async (googleUser) => {
                        // If a googleUser was found return it 
                        if (googleUser) {
                            done(null, googleUser);
                        }
                        else {
                            // Create a googleUser 
                            let googleUser = new GoogleUser({
                                googleId: googleId,
                                email: profile.emails[0].value,
                                displayName: profile.displayName,
                                firstName: profile.name.givenName,
                                lastName: profile.name.familyName,
                                image: profile.photos[0].value
                            });

                            // Save the new GoogleUser then return it
                            await googleUser
                                .save()
                                .then((googleUserDoc) => {
                                    done(null, googleUserDoc);
                                })
                                .catch(err => { 
                                    done(err);
                                }
                            );
                        }
                    });
            } catch (err) {
                console.error(err);
            }
        })
    );

    passport.use('jwt',
        new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET_KEY,
        },
        async (token, done) => {
            try {
                // console.log(`jwt-strategy-token: ${JSON.stringify(token)}`);
                return done(null, token.token);
            } catch (error) {
                done(error);
            }
        }
    ));

    passport.serializeUser((user, done) => {
        console.log(`serializeUser user: ${JSON.stringify(user)}`);
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        console.log(`deserializeUser id: ${JSON.stringify(id)}`);
        
        User.findById(id, (err, user) => {
            console.log(`deserializeUser user: ${JSON.stringify(user)}`);

            done(err, user);
        })
    });
}