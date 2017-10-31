/**
 * freeCodeCamp - Back End Development Certification - Dynamic Web Application Projects
 * Routes - Index
 * 
 * @author MLBORS
 * @version 1.0.0.0
 * @since 2017.10.30
 * @for freeCodeCamp
 */

/*******************/
/***** IMPORTS *****/
/*******************/

var express = require('express');
var router = express.Router();

const auth = require('./auth');
const logout = require('./logout');

/************************************************************/
/************************************************************/

/****************/
/***** HOME *****/
/****************/

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/************************************************************/
/************************************************************/

/****************/
/***** AUTH *****/
/****************/

router.use('/auth', auth)

/************************************************************/
/************************************************************/

/******************/
/***** LOGOUT *****/
/******************/

router.use('/logout', logout)

/************************************************************/
/************************************************************/

/*******************/
/***** EXPORTS *****/
/*******************/

module.exports = router;
