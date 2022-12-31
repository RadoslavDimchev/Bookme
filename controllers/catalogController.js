const { getAll, getById } = require('../services/accommodationService');

const router = require('express').Router();


router.get('/', (req, res) => {
  const search = req.query.search || '';
  const city = req.query.city || '';
  const fromPrice = Number(req.query.fromPrice) || 1;
  const toPrice = Number(req.query.toPrice) || 1000;

  const rooms = getAll(search, city, fromPrice, toPrice);

  res.render('catalog', {
    title: 'All Accommodation',
    rooms,
    search,
    city,
    fromPrice,
    toPrice
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