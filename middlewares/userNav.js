module.exports = () => (req, res, next) => {
  if (req.user !== undefined) {
    res.locals.hasUser = true;
    res.locals.username = req.user.username;
    if (req.user.roles.includes('admin')) {
      res.locals.isAdmin = true;
    }
  }
  next();
};