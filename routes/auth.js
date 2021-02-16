const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
const bcrypt = require('bcryptjs');

router.post('/logout', (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
});

router.get('/login', (req, res, next) => {
  res.render('auth/login');
});

router.post('/login', (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.render('auth/login', {
      errorMessage: 'Please enter both username and password'
    });
    return;
  }

  User.findOne({ username: username })
    .then(user => {
      if (!user) {
        res.render('auth/login', {
          errorMessage: 'Invalid login'
        });
        return;
      }

      if (bcrypt.compareSync(password, user.password)) {
        req.session.currentUser = user;
        res.redirect('/');
        //res.render('index', { user });
      } else {
        res.render('auth/login', {
          errorMessage: 'Invalid login'
        });
      }
    })
    .catch(e => {
      next(e);
    });
});

router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});

router.post('/signup', (req, res) => {
  const { username, email, password } = req.body;

  if (username === '' || password === '') {
    res.render('auth/signup', {
      errorMessage: 'Indicate username and passsword'
    });
    return;
  }

  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (passwordRegex.test(password) === false) {
    res.render('auth/signup', { errorMessage: 'Weak password' });
    return;
  }
  User.findOne({ username: username })
    .then(user => {
      if (user) {
        res.render('auth/signup', { errorMessage: 'User already exists' });
        return;
      }

      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashPassword = bcrypt.hashSync(password, salt);
      User.create({
        username,
        email,
        password: hashPassword
      })
        .then(() => {
          res.redirect('/');
        })
        .catch(error => {
          if (error.code === 11000) {
            res.render('auth/signup', {
              errorMessage: 'Username and email should be unique'
            });
          }
        });
    })
    .catch(e => {
      next(e);
    });
});

// router.post('/signup', (req, res, next) => {
//   const { username, email, password } = req.body;
//   if (username === '' || password === '') {
//     res.render('auth/signup', {
//       errorMessage: 'Indicate username and password'
//     });
//     return;
//   }

//   const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
//   if (!passwordRegex.test(password)) {
//     res.render('auth/signup', {
//       errorMessage:
//         'Your password should have at least six characters, one letter lowecase, one letter uppercase and a number'
//     });
//     return;
//   }

//   User.findOne({ username: username })
//     .then(user => {
//       if (user) {
//         res.render('auth/signup', {
//           errorMessage: 'Username already exists'
//         });
//         return;
//       } else {
//         return User.findOne({ email: email });
//       }
//     })
//     .then(user => {
//       if (user) {
//         res.render('auth/signup', {
//           errorMessage: 'Email already exists'
//         });
//         return;
//       } else {
//         const saltRounds = 10;
//         const salt = bcrypt.genSaltSync(saltRounds);
//         const hashPassword = bcrypt.hashSync(password, salt);
//         return User.create({ username, email, password: hashPassword });
//       }
//     })
//     .then(() => {
//       res.redirect('/');
//     })
//     .catch(e => {
//       next(e);
//     });
// });

module.exports = router;
