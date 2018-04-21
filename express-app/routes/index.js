var express = require('express');
var router = express.Router();

var Director = require('../models/directorModel');
var Movie = require('../models/movieModel');

router.get('/', function(req, res, next) {
  Movie.find({}).populate('director').
      exec(function(err, movies) {
          if (err) {
            console.log(err);
          }
          res.render('index', {movies: movies});
      }
  );
});

module.exports = router;
