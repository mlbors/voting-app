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
const chartsService = require('../services/charts')

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

    let chartData, chartLabels 
    
    if (typeof data.answers !== 'undefined' && data.answers !== null && data.answers !== '') {
      chartData = data.answers.map((a) => a.votes)
      chartLabels = data.answers.map((a) => a.answer)
    }
    
    res.render('poll-detail', {
      poll: data,
      auth: req.isAuthenticated(),
      votedByUser: data.voted.indexOf(req.user),
      error: err,
      message: '',
      chartData: {
        datasets:[{
          data: chartData
        }],
        labels: chartLabels
      }
    })
  })
})

/************************************************************/
/************************************************************/

/*****/
/***** GET BY ID *****/
/*****/

router.get('/:id', (req, res) => {
  dbPolls.findById(req.params.id, (err, data) => {

    let chartData, chartLabels 

    if (typeof data.answers !== 'undefined' && data.answers !== null && data.answers !== '') {
      chartData = data.answers.map((a) => a.votes)
      chartLabels = data.answers.map((a) => a.answer)
    }

    res.send(JSON.stringify(
      {
        poll: data,
        auth: req.isAuthenticated(),
        votedByUser: data.voted.indexOf(req.user),
        error: err,
        message: '',
        chartData: {
          datasets:[{
            data: chartData
          }],
          labels: chartLabels
        }
      }
    ))

  })
})

/************************************************************/
/************************************************************/

/*****/
/***** VOTE *****/
/*****/

router.post('/vote', (req, res) => {
  dbPolls.vote(req.body.id, req.body.answer, req.user, (err, data) => {
    res.redirect('/polls/detail/' + req.body.id);
  })
})

/************************************************************/
/************************************************************/

/*****/
/***** ADD ANSWER *****/
/*****/

router.get('/add-answer/:id', (req, res) => {
  dbPolls.findById(req.params.id, (err, data) => {
    res.render('add-answer', {
      poll: data,
      auth: req.isAuthenticated(),
      error: err,
      message: ''
    })
  })
})

/************************************************************/
/************************************************************/

/*****/
/***** SUBMIT ANSWER *****/
/*****/

router.post('/submit-answer', (req, res) => {
  dbPolls.addAnswer(req.body.id, req.body.answer, (err, data) => {
    res.redirect('/polls/detail/' + req.body.id);
  })
})

/************************************************************/
/************************************************************/

/*******************/
/***** EXPORTS *****/
/*******************/

module.exports = router