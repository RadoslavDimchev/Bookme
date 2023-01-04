const { getAll, getById } = require('../services/roomService');

const catalogController = require('express').Router();


catalogController.get('/', async (req, res) => {
  const search = req.query.search || '';
  const city = req.query.city || '';
  const fromPrice = Number(req.query.fromPrice) || 1;
  const toPrice = Number(req.query.toPrice) || 1000;

  const rooms = await getAll(search, city, fromPrice, toPrice);

  res.render('catalog', {
    title: 'All Accommodation',
    rooms,
    search,
    city,
    fromPrice,
    toPrice
  });
});

catalogController.get('/:id', async (req, res) => {
  const id = req.params.id;
  const room = await getById(id);

  if (req.user && req.user._id.toString() === room.owner.toString()) {
    room.isOwner = true;
  }

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

module.exports = catalogController;