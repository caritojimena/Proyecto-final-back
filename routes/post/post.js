var express = require('express');
var router = express.Router();
var object = require('../../modules/objectsAndTypes');


/* GET users listing. */
router.get('/:id', passport.authenticate('bearer', { session: false }), (req, res, next) => {
  let includes = {};
  includes.id = [
    {
      model: models.User, as: 'User', include: [
        { model: models.File, as: 'Photo' },
      ]
    },
    { model: models.File, as: 'Photo' },
    { model: models.Comment, as: 'Comments' },
    { model: models.Like, as: 'Likes' },
  ];

  includes.all = [
    {
      model: models.User, as: 'User', include: [
        { model: models.File, as: 'Photo' },
      ]
    },
    { model: models.File, as: 'Photo' },
    { model: models.Comment, as: 'Comments' },
    { model: models.Like, as: 'Likes' },
  ];

  let order = [
    ['updated_at', 'DESC']
  ];

  object.get('Post', req.params.id, 1, includes, false, false, order)
    .then(response => {
      res.json({ status: true, content: response });
    })
    .catch(response => {
      res.json({ status: false, content: response });
    });
});

router.post('/save', (req, res, next) => {
  req.body.owner = req.session.user.id;
  object.save([
    'owner',
    'photo',
    'content',
  ], req.body, 'Post')
    .then(response => {
      res.json({ status: true, content: response });
    })
    .catch(response => {
      res.json({ status: false, content: response });
    });
});


router.put('/save/:id', (req, res, next) => {
  req.body.id = req.params.id;
  object.update([
    'owner',
    'photo',
    'content',
  ], req.body, 'Post')
    .then(response => {
      res.json({ status: true, content: response });
    })
    .catch(response => {
      res.json({ status: false, content: response });
    });
});

router.delete('/delete/:id', (req, res, next) => {
  object.delete('Post', req.params.id)
    .then(response => {
      res.json({ status: true, content: response });
    })
    .catch(response => {
      res.json({ status: false, content: response });
    });
});

module.exports = router;