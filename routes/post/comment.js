var express = require('express');
var router = express.Router();
var object = require('../../modules/objectsAndTypes');


/* GET users listing. */
router.get('/:id',passport.authenticate('bearer', { session: false }), (req, res, next) => {
  object.get('Comment', req.params.id, 1, null)
    .then(response => {
      res.json({ status: true, content: response });
    })
    .catch(response => {
      res.json({ status: false, content: response });
    });
});

router.post('/save', (req, res, next) => {
  object.save([
    'message',
    'owner',
  ], req.body, 'Comment')
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
    'message',
    'owner',
  ], req.body, 'Comment')
    .then(response => {
      res.json({ status: true, content: response });
    })
    .catch(response => {
      res.json({ status: false, content: response });
    });
});

router.delete('/delete/:id', (req, res, next) => {
  object.delete('Comment', req.params.id)
    .then(response => {
      res.json({ status: true, content: response });
    })
    .catch(response => {
      res.json({ status: false, content: response });
    });
});

module.exports = router;
