/**
 * freeCodeCamp - Back End Development Certification - Dynamic Web Application Projects
 * Auth - Twitter
 * 
 * @author MLBORS
 * @version 1.0.0.0
 * @since 2017.10.30
 * @for freeCodeCamp
 */

/*******************/
/***** IMPORTS *****/
/*******************/

const TwitterStrategy = require('passport-twitter').Strategy
const passport = require('passport')
const mongodb = require('mongodb')
const shortid = require('shortid')

const dbInfo = require('../db/db')

require('dotenv').config()

/************************************************************/
/************************************************************/

/********************/
/***** DATABASE *****/
/********************/

const MongoClient = mongodb.MongoClient
const dbUrl = dbInfo.info.url

/************************************************************/
/************************************************************/

/********************/
/***** STRATEGY *****/
/********************/

passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: process.env.CALLBACK || "http://localhost:3000/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {

    process.nextTick(function(){
      MongoClient.connect(dbUrl, (err, db) => {

        const User = db.collection('users')
        User.findOne({
          'token': token
        }, function(err,user) {

          if (err) return done(err)

            if (!user) {

              const newUser = {
                _id: shortid.generate(),
                token: token,
                displayName: profile.displayName
              }

              User.insert(newUser);
              return done(null, newUser)

            }

            return done(null, user)

        })
        
      })

    })

  }
))

/************************************************************/
/************************************************************/

/*********************/
/***** SERIALIZE *****/
/*********************/

passport.serializeUser((user, done) => {
	done(null, user._id)
});

/************************************************************/
/************************************************************/

/***********************/
/***** DESERIALIZE *****/
/***********************/

passport.deserializeUser((obj, done) => {
	done(null, obj)
});

/************************************************************/
/************************************************************/

/*******************/
/***** EXPORTS *****/
/*******************/

module.exports = passport;