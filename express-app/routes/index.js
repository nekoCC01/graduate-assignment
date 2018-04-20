var express = require('express');
var router = express.Router();

var Director = require('../models/directorModel');
var Movie = require('../models/movieModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  Movie.
      findOne({title: 'The Shining'}).
      populate('director').
      exec(function(err, movie) {
        if (err) {
          console.log(err);
        }
        console.log('The director is %s', movie.director.name);
        // prints "The author is Ian Fleming"
      });

  res.render('index', { title: 'Express' });
});

module.exports = router;
