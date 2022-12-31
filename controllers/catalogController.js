const { getAll, getById } = require('../services/accommodationServise');

const router = require('express').Router();


router.get('/', (req, res) => {
  const rooms = getAll();
  res.render('catalog', {
    title: 'All Accommodation',
    rooms
  });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const room = getById(id);

  if (room) {
    res.render('details', {
      title: 'Accommodation Details',
      room
    });
  } else {
    res.render('roomNotFound', {
      title: 'Accommodation Details',
      id
    });
  }
});

module.exports = router;