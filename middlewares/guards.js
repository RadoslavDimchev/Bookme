function hasUser() {
  return (req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect('/auth/login');
    }
  };
}

function isGuest() {
  return (req, res, next) => {
    if (!req.user) {
      next();
    } else {
      res.redirect('/');
    }
  };
}

function hasRole(role) {
  return (req, res, next) => {
    if (req.user === undefined || req.user.roles.includes(role) === false) {
      return res.redirect('/auth/login');
    } else {
      next();
    }
  };
}

module.exports = {
  hasUser,
  isGuest,
  hasRole
};