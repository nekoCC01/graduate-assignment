var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var directorSchema = mongoose.Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  lifespan: String,
  biography: String
});

module.exports = mongoose.model('Director', directorSchema);