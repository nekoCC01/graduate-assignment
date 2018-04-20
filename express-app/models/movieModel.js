var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var movieSchema = mongoose.Schema({
  title: String,
  year: Number,
  director: {type: Schema.Types.ObjectId, ref: 'Director'}
});


module.exports = mongoose.model('Movie', movieSchema);