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

const dbInfo = require('../db/db')

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
/***** FIND ALL *****/
/********************/

/*
 * @var Function callback a callback function
 * @return Array
 */

module.findAll = (callback) => {

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
}

/************************************************************/
/************************************************************/

/*******************/
/***** ADD ONE *****/
/*******************/

/*
 * @var Object data info to keep in the history
 * @var Function callback a callback function
 */

exports.addOne = (item, callback) => {

  MongoClient.connect(dbURL, (err, db) => {
    
    if (err) return callback(err)
    
    db.collection('polls').insertOne(item, (err, data) => {
      if (err) return callback(err)
      db.close()
      return callback(null, item)
    })
  })

}

/************************************************************/
/************************************************************/

/**********************/
/***** FIND BY ID *****/
/**********************/

exports.findById = (id, callback) => {

  MongoClient.connect(dbURL, (err, db) => {

    if (err) return callback(err)
    
    db.collection('polls').findOne({_id: id}, (err, item) => {
      if (err) return callback(err)
      db.close()
      return callback(null, item)
    })

  })

}

/************************************************************/
/************************************************************/

/****************/
/***** VOTE *****/
/****************/

exports.vote = (id, selected, user, callback) => {

  MongoClient.connect(dbURL, (err, db) => {
    
    if (err) return callback(err)
    
    findById(id, (err, data) => {

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
					}
				)
      }

      return callback(null, true)
      
      db.close()

    })

  })

}


