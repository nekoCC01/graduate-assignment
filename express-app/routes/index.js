var express = require('express');
var router = express.Router();

var Director = require('../models/directorModel');
var Movie = require('../models/movieModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  Movie.
      find({}).
      populate('director').
      exec(function(err, movies) {
        if (err) {
          console.log(err);
        }
        console.log(movies);
        res.render('index', {movies: movies});
      });
});

module.exports = router;
