const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = require('../models/GoogleUser');

module.exports = function(passport) {
    // Google auth strategy for passport
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
        const newGoogleUser = {
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName
            // image: profile.photos[0] 
        }
        
        
        try {
            // Try to find a user in the DB by their googleID
            let user = await User.findOne({ googleId: profile.id });

            // If the user was not found, make a new one
            if (!user)
                user = await User.create(newGoogleUser);
            
            // Set req.user to the user's profile
            done(null, user);
        } catch (err) {
            console.error(err);
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user.id);
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user));
    })
}