const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie.model');
const fileUpload = require('../configs/cloudinary');

router.get('/movies/create', (req, res, next) => {
  res.render('movies/movie-create');
});

router.post('/movies/create', fileUpload.single('image'), (req, res, next) => {
  const { title, synopsis } = req.body;
  const fileUrlOnCloudinary = req.file.path;

  Movie.create({
    title,
    synopsis,
    image: fileUrlOnCloudinary
  }).then(() => {
    res.redirect('/');
  });
});

router.get('/movies', (req, res) => {
  Movie.find().then(movies => {
    res.render('movies/movies-list', { movies });
  });
});

module.exports = router;
