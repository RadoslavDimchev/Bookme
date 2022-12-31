const router = require('express').Router();


router.get('/', (req, res) => {
  res.render('create', {
    title: 'Host New Accommodation'
  });
});

// router.post('/', (req, res) => {
//   res.render('create', {
//     title: 'Accommodation Details'
//   });
// });

module.exports = router;