const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const authorSchema = new Schema({
  name: String,
  bio: String
});

//module.exports = model('Author', authorSchema);

const Author = model('Author', authorSchema);
module.exports = Author;
