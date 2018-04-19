const mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect(
    'mongodb://dkasai:J0H0C0nn3ct!@hes-mean-shard-00-00-cywuc.mongodb.net:27017,hes-mean-shard-00-01-cywuc.mongodb.net:27017,hes-mean-shard-00-02-cywuc.mongodb.net:27017/graduate-assignment?ssl=true&replicaSet=HES-mean-shard-0&authSource=admin');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!

  /*
  -------------------------------------------
  Movies & Directors - Schema/Model
  -------------------------------------------
  */

  var directorSchema = mongoose.Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    lifespan: String,
    biography: String,
    movies: [{type: Schema.Types.ObjectId, ref: 'Movie'}]
  });

  var movieSchema = mongoose.Schema({
    title: String,
    year: Number,
    director: {type: Schema.Types.ObjectId, ref: 'Director'}
  });

  var Movie = mongoose.model('Movie', movieSchema);
  var Director = mongoose.model('Director', directorSchema);

  /*
  -------------------------------------------
  Saving refs
  -------------------------------------------
  */

  var director = new Director({
    _id: new mongoose.Types.ObjectId(),
    name: 'Stanley Kubrick',
    lifespan: '1928-1999',
    biography: 'Stanley Kubrick was an American film director, screenwriter, and producer. ' +
    'He is frequently cited as one of the greatest and most influential directors in cinematic history. ' +
    'His films, which are mostly adaptations of novels or short stories, cover a wide range of genres, ' +
    'and are noted for their realism, dark humor, unique cinematography, extensive set designs, and evocative use of music.'
  });

  director.save(function(err) {
    if (err) {
      console.log(err);
    }

    var movie1 = new Movie({
      title: 'The Shining',
      year: 1980,
      director: director._id
    });

    movie1.save(function(err) {
      if (err) {
        console.log(err);
      }
    });

    var movie2 = new Movie({
      title: 'A Clockwork Orange',
      year: 1980,
      director: director._id
    });

    movie2.save(function(err) {
      if (err) {
        console.log(err);
      }
    });

  });

  /*
   -------------------------------------------
   Populating our movie´s director
   -------------------------------------------
   */


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

  /*
  -------------------------------------------
  save movies..
  -------------------------------------------

  var americanBeauty = new Movie({title: 'American Beauty'});
  console.log(americanBeauty.title);

  americanBeauty.save(function(err, movie) {
    if (err) {
      return console.error(err);
    }
  });

  Movie.find(function(err, movies) {
    if (err) {
      return console.error(err);
    }
    console.log(movies);
  });
  */

});

var http = require('http');
var server = http.createServer(function(req, res) {
  res.writeHead(200);
  res.write('Hello World');
  res.end();
});
server.listen(8080);
console.log('Listening on http://127.0.0.1:8080/');