const roomController = require('express').Router();

const { isOwner } = require('../middlewares/guards');
const preload = require('../middlewares/preload');
const { update, deleteById } = require('../services/roomService');
const { parseError } = require('../utils/parser');


roomController.get('/:id/edit', preload(true), isOwner(), (req, res) => {
  res.render('edit', {
    title: 'Edit Accomodation',
    room: res.locals.room
  });
});

roomController.post('/:id/edit', preload(), isOwner(), async (req, res) => {
  try {
    const result = await update(res.locals.room, req.body);
    res.redirect('/catalog/' + result.id);
  } catch (error) {
    res.render('edit', {
      title: 'Edit Accomodation',
      room: Object.assign({ _id: req.params.id }, req.body),
      error: parseError(error)
    });
  }
});

roomController.get('/:id/delete', preload(true), isOwner(), (req, res) => {
  res.render('delete', {
    title: 'Delete Accomodation',
    room: res.locals.room
  });
});

roomController.post('/:id/delete', preload(), isOwner(), async (req, res) => {
  try {
    await deleteById(req.params.id);
    res.redirect('/catalog');
  } catch (error) {
    res.render('delete', {
      title: 'Delete Accomodation',
      error: parseError(error),
      room: Object.assign({ _id: req.params.id }, req.body)
    });
  }
});

module.exports = roomController;