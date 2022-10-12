const passportCustom = require('passport-custom');
const CustomStrategy = passportCustom.Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require("bcryptjs");
const User = require('../models/User');

module.exports = function(passport) {
    // Passport custom login strategy
    passport.use('login', new CustomStrategy(
        async (req, done) => {
            const email = req.body.email;
            const password = req.body.password;

            // Find user by email
            const user = await User.findOne({ email: email });

            // Check if user exists
            if (!user) {
                const err = new Error("Could not find the given email!");
                // Call passport's callback for error
                done(err);
                return;
            }

            // Ensure the user is not a google user. If they are,
            // send error stating they need to sign in w/ google
            if (user.googleId) {
                const err = new Error("Please sign in using your google account!");
                // Call passport's callback for error
                done(err);
                return;
            }

            // Check the user's password
            user.isValidPassword(password, user)
                .then((isValid) => {
                    // if the password is valid, return the user
                    if (isValid)
                        done(null, user);
                    else {
                        // Otherwise return an error
                        const err = new Error("Invaild password!");
                        done(err);
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
            async (req, res) => {
                const user = await User.findOne({ email: req.body.email });
                if (user)
                    return res.status(400).json({ email: "Email already exists" });

                const newUser = new User({
                    username: req.body.username,
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
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
            let googleUser = {
                name: `${profile.name.givenName} ${profile.name.familyName}`,
                email: profile.emails[0].value,
                password: profile.id, // never used w/ google accounts (required for every user)
                googleId: profile.id,
                displayName: profile.displayName
            }
            
            try {
                // Try to find a user in the DB by their googleID
                let user = await User.findOne({ googleId: profile.id });

                // If the user was not found, hash their password
                if (!user) {
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(googleUser.password, salt, async (err, hash) => {
                            if (err) throw err;

                            // Update the user's password with the hash
                            googleUser.password = hash;
                            // Create the user in the db and store the result
                            user = await User.create(googleUser);
                            // Set req.user to the user's profile
                            done(null, user);
                        });
                    });
                }
            } catch (err) {
                console.error(err);
            }
        })
    );

    passport.use('jwt',
        new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromUrlQueryParameter('secret_token'),
            secretOrKey: process.env.JWT_SECRET_KEY,
        },
        async (token, done) => {
            try {
                return done(null, token.user);
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