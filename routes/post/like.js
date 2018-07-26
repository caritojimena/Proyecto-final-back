var express = require('express');
var router = express.Router();
var object = require('../../modules/objectsAndTypes');


router.post('/save', (req, res, next) => {
  req.body.o = req.session.user.id;
  object.save([
    'post',
  ], req.body, 'Like')
    .then(response => {
      res.json({ status: true, content: response });
    })
    .catch(response => {
      res.json({ status: false, content: response });
    });
});

router.delete('/delete/:id', (req, res, next) => {
  object.delete('Like', req.params.id)
    .then(response => {
      res.json({ status: true, content: response });
    })
    .catch(response => {
      res.json({ status: false, content: response });
    });
});


module.exports = router;
