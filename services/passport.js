const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const Users = mongoose.model('users');

passport.use(new GoogleStrategy({
	clientID: keys.googleClientID,
	clientSecret: keys.googleClientSecret,
	callbackURL: '/auth/google/callback'
},
	(accessToken, refreshToken, profile, done) => {
		Users.findOne({ googleID: profile.id})
		  .then((existingUser) => {
				if(existingUser) {
					console.log('Existing Profile ID');
					done(null, existingUser);
				} else {
					new Users({
						googleID: profile.id,
						displayName: profile.displayName,
						name: profile.name,
						emails: profile.emails[0].value
					})
					.save()
					.then(user => done(null, user));
				}
			})
	}
));