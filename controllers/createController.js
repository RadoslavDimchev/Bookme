const { create } = require('../services/roomService');
const { parseError } = require('../utils/parser');

const createController = require('express').Router();


createController.get('/', (req, res) => {
  res.render('create', {
    title: 'Host New Accommodation'
  });
});

createController.post('/', async (req, res) => {
  try {
    const result = await create(req.body, req.user._id);
    res.redirect('/catalog/' + result.id);
  } catch (error) {
    res.render('create', {
      title: 'Request Error',
      body: req.body,
      error: parseError(error)
    });
  }
});

module.exports = createController;