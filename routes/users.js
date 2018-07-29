var express = require('express');
var router = express.Router();
var object = require('../modules/objectsAndTypes');
var crypto = require('crypto');

/* GET users listing. */
router.get('/:id', passport.authenticate('bearer', { session: false }), (req, res, next) => {
  let includes = {};
  includes.id = [
    { model: models.File, as: 'Photo' }
  ];

  object.get('User', req.params.id, 1, include)
    .then(response => {
      res.json({ status: true, content: response });
    })
    .catch(response => {
      res.json({ status: false, content: response });
    });
});

router.post('/save', (req, res, next) => {
  req.body.token = crypto.createHmac('sha256', config.crypto.salt)
    .update((Math.random() * 1000 + ""))
    .digest('hex');

  object.save([
    'email',
    'password',
    'firstName',
    'lastName',
    'photo',
    'token'
  ], req.body, 'User')
    .then(response => {
      res.json({ status: true, content: response });
    })
    .catch(response => {
      res.json({ status: false, content: response });
    });
});

router.put('/save/:id', passport.authenticate('bearer', { session: false }), (req, res, next) => {
  req.body.id = req.params.id;
  object.update([
    'email',
    'password',
    'firstName',
    'lastName',
    'photo'
  ], req.body, 'User')
    .then(response => {
      res.json({ status: true, content: response });
    })
    .catch(response => {
      res.json({ status: false, content: response });
    });
});

router.delete('/delete/:id', passport.authenticate('bearer', { session: false }), (req, res, next) => {
  object.delete('User', req.params.id)
    .then(response => {
      res.json({ status: true, content: response });
    })
    .catch(response => {
      res.json({ status: false, content: response });
    });
});

router.post('/login', (req, res, next) => {
  var passwordHash = crypto.createHmac('sha256', config.crypto.salt)
    .update(req.body.password)
    .digest('hex');

  models.User.findOne({
    where: {
      email: req.body.email,
      password: passwordHash
    }
  }).then(user => {
    if (user) {
      if (!user.token) {
        user.token = crypto.createHmac('sha256', config.crypto.salt)
          .update((Math.random() * 1000 + ""))
          .digest('hex');

        user.save();
      }

      res.json({ status: true, content: user });
    } else {
      res.json({ status: false, content: "usuario no existe" });
    }
  });
});

router.post('/logout', passport.authenticate('bearer', { session: false }), (req, res, next) => {
  if (req.session.user) {
    req.session.user.token = null;
    req.session.user.save()
  }

  res.json({ status: true, content: 'vuelva pronto' });
});

module.exports = router;