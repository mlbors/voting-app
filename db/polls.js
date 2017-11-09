/**
 * freeCodeCamp - Back End Development Certification - Dynamic Web Application Projects
 * Db - Polls
 * 
 * @author MLBORS
 * @version 1.0.0.0
 * @since 2017.10.30
 * @for freeCodeCamp
 */

/*******************/
/***** IMPORTS *****/
/*******************/

const mongodb = require('mongodb')
const shortid = require('shortid')

const dbInfo = require('./db')

/************************************************************/
/************************************************************/

/********************/
/***** DATABASE *****/
/********************/

const MongoClient = mongodb.MongoClient
const dbUrl = dbInfo.info.url

/************************************************************/
/************************************************************/

const self = module.exports = {

  /********************/
  /***** FIND ALL *****/
  /********************/

  /*
  * @var Function callback a callback function
  * @return Array
  */

  findAll: (callback) => {

      MongoClient.connect(dbUrl, (err, db) => {
      
        if (err) return callback(err)
        
        db.collection('polls')
        .find({})
        .sort({'date': -1})
        .toArray((err, result) => {
          if (err) return callback(err)
          db.close()
          return callback(null, result)
        })

    })
  },

  /************************************************************/
  /************************************************************/

  /**********************/
  /***** FIND BY ID *****/
  /**********************/

  /*
  * @var String id poll's id
  * @var Function callback a callback function
  */

  findById: (id, callback) => {

    MongoClient.connect(dbUrl, (err, db) => {

      if (err) return callback(err)
      
      db.collection('polls').findOne({_id: id}, (err, item) => {
        if (err) return callback(err)
        db.close()
        return callback(null, item)
      })

    })

  },

  /************************************************************/
  /************************************************************/

  /***************************************/
  /***** GET VOTE FROM POLL FOR USER *****/
  /***************************************/

  getVoteFromPollForUser: (id, user, callback) => {

    MongoClient.connect(dbUrl, (err, db) => {

      if (err) return callback(err)

      self.findById(id, (err, data) => {
        
        if (err) return callback(err)

        return callback(null, data.voted.indexOf(user))

      })

    })

  },

  /************************************************************/
  /************************************************************/

  /****************/
  /***** VOTE *****/
  /****************/

  /*
  * @var String id poll's id
  * @var String selected answer
  * @var String user user's id
  * @var Function callback a callback function
  */

  vote: (id, selected, user, callback) => {

    MongoClient.connect(dbUrl, (err, db) => {
      
      if (err) return callback(err)
      
      self.findById(id, (err, data) => {

        if (err) return callback(err)

        const polls = db.collection('polls')

        if (data.voted.indexOf(user) === -1 && user) {

          polls.update(
            {
              "_id": id, 
              "answers.answer": selected
            },
            {
              $inc: {
                "answers.$.votes": 1
              }, 
              $push: { 
                "voted": user
              }
            },
            (err, res) => {
              db.close()
              return callback(err, res)
            }
          )
        } else {
          db.close()
          return callback('Already voted', true)
        }

      })

    })

  },

  /************************************************************/
  /************************************************************/

  /**********************/
  /***** ADD ANWSER *****/
  /**********************/

  /*
  * @var String id poll's id
  * @var String answer answer to add
  * @var Function callback a callback function
  */

  addAnswer: (id, answer, callback) => {

    MongoClient.connect(dbUrl, (err, db) => {
      
      if (err) return callback(err)

      const polls = db.collection('polls')
      polls.update(
        {
          "_id": id
        },
        {
          $push: {
            "answers": { 
              answer: answer, 
              "votes": 0
            }
          }
        },
        (err, res) => {
          db.close()
          return callback(err, res)
        }
      )
    })

  },

  /************************************************************/
  /************************************************************/

  /********************/
  /***** NEW POLL *****/
  /********************/

  /*
  * @var String id poll's id
  * @var String user user's id
  * @var String question
  * @var Array answers
  * @var Function callback a callback function
  */

  newPoll: (user, question, answers, callback) => {

    MongoClient.connect(dbUrl, (err, db) => {

      if (err) return callback(err)

      const polls = db.collection('polls')

      polls.insertOne(
        {
          _id: shortid.generate(), 
          author: user, 
          date: new Date(),
          question: question, 
          answers: answers, 
          voted: []
        },
        (err, res) => {
          db.close()
          return callback(err, res)
        }
      )
    })
  }

}