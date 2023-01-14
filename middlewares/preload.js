const { getById, getByIdRaw } = require('../services/roomService');

module.exports = (lean) => async (req, res, next) => {
  if(lean) {
    res.locals.room = await getById(req.params.id);
  } else {
    res.locals.room = await getByIdRaw(req.params.id);
  }

  next();
};