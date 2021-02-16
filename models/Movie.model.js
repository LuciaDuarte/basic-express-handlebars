const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const movieSchema = new Schema({
  title: {
    type: String
  },
  synopsis: {
    type: String
  },
  image: {
    type: String
  }
});

// const Movie = model('Movie', movieSchema);
// module.exports = Movie;
module.exports = model('Movie', movieSchema);
