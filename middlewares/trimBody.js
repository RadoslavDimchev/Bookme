module.exports = (...excludedKeys) => (req, res, next) => {
  for (const key in req.body) {
    if (excludedKeys.includes(key) === false) {
      req.body[key] = req.body[key].trim();
    }
  }

  next();
};