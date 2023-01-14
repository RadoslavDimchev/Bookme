const facilityController = require('express').Router();
const { body, validationResult } = require('express-validator');

const { hasRole, isOwner } = require('../middlewares/guards');
const preload = require('../middlewares/preload');
const { createFacility, getAllFacilities, addFacilities } = require('../services/facilityService');
const { parseError } = require('../utils/parser');


facilityController.get('/create', hasRole('admin'), (req, res) => {
  res.render('createFacility', {
    title: 'Create New Facility'
  });
});

facilityController.post('/create', hasRole('admin'),
  body('label')
    .notEmpty().withMessage('Label is required!'),
  body('iconUrl')
    .isLength(10).withMessage('Icon URL must be at least 10 character long'),
  async (req, res) => {
    try {
      const { errors } = validationResult(req);
      if (errors.length > 0) {
        throw errors;
      }
      await createFacility(req.body.label, req.body.iconUrl);
      res.redirect('/catalog');
    } catch (error) {
      res.render('createFacility', {
        title: 'Create New Facility',
        error: parseError(error),
        body: req.body
      });
    }
  });

facilityController.get('/:id/decorateRoom', preload(true), isOwner(), async (req, res) => {
  const room = res.locals.room;
  const facilities = await getAllFacilities();
  facilities.forEach(f => {
    if (room.facilities.some(x => x._id.toString() === f._id.toString())) {
      f.checked = true;
    }
  });

  res.render('decorate', {
    title: 'Add Facility',
    room,
    facilities
  });
});

facilityController.post('/:id/decorateRoom', preload(), isOwner(), async (req, res) => {
  try {
    await addFacilities(res.locals.room, Object.keys(req.body));
    res.redirect(`/facility/${req.params.id}/decorateRoom`);
  } catch (error) {
    res.redirect(`/facility/${req.params.id}/decorateRoom`);
  }
});

module.exports = facilityController;