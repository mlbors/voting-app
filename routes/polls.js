/**
 * freeCodeCamp - Back End Development Certification - Dynamic Web Application Projects
 * Routes - Polls
 * 
 * @author MLBORS
 * @version 1.0.0.0
 * @since 2017.10.30
 * @for freeCodeCamp
 */

/*******************/
/***** IMPORTS *****/
/*******************/

const express = require('express')
const passport = require('passport')
const router = express.Router()

const dbPolls = require('../db/polls')
const answersService = require('../services/answers')

/************************************************************/
/************************************************************/

/******************/
/***** ROUTES *****/
/******************/

/*****/
/***** INDEX *****/
/*****/

router.get('/', (req, res) => {
	dbPolls.findAll((err, data) => {

		if (err) {
      res.send({error: 'Error while getting data', err: err, data: data})
      return
    } 

		res.render('polls', {
      title: 'Polls', 
      auth: req.isAuthenticated(),
			polls: data
    })
    
	})
})

/************************************************************/
/************************************************************/

/*****/
/***** ADD *****/
/*****/

router.get('/add', (req, res) => {
	res.render('create-poll', {
    title: 'Create poll',
    auth: req.isAuthenticated()
  })
})

/************************************************************/
/************************************************************/

/*****/
/***** CREATE *****/
/*****/

router.post('/create', (req, res) => {
  const parsedAnswers = answersService.parseAnswers(req.body.answers)
  dbPolls.newPoll(req.user, req.body.question, parsedAnswers, (err, data) => {
    res.redirect('/polls');
  })
})

/************************************************************/
/************************************************************/

/*****/
/***** DETAILS *****/
/*****/

router.get('/detail/:id', (req, res) => {
  dbPolls.findById(req.params.id, (err, data) => {
    res.render('poll-detail', {
      poll: data,
      auth: req.isAuthenticated()
    })
  })
})

/************************************************************/
/************************************************************/

/*******************/
/***** EXPORTS *****/
/*******************/

module.exports = router