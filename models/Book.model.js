const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const bookSchema = new Schema(
  {
    title: String,
    description: String,
    // author: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: 'Author'
    },
    rating: Number,
    reviews: [
      {
        user: String,
        comment: String
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = model('Book', bookSchema);
