const express = require('express');
const router = express.Router();

function requireLogin(req, res, next) {
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect('/login');
  }
}

function checkRoles(roles) {
  return function (req, res, next) {
    if (
      req.session.currentUser &&
      roles.includes(req.session.currentUser.role)
    ) {
      next();
    } else {
      res.redirect('/login');
    }
  };
}

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index', { user: req.session.currentUser });
});

router.get('/private', requireLogin, (req, res) => {
  res.render('private');
});

router.get('/private-admin', checkRoles(['Admin']), (req, res) => {
  res.render('private');
});

router.get('/map', (req, res) => {
  const markers = [
    { lat: 38.7129146, lng: -9.1286218 },
    { lat: 38.7117206, lng: -9.1264315 },
    { lat: 38.7123872, lng: -9.1287935 }
  ];
  const markersString = JSON.stringify(markers);
  res.render('map', { markers: markersString });
});

module.exports = router;
