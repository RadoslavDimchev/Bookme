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

function isOwner() {
  return (req, res, next) => {
    if (req.user && req.user._id.toString() === res.locals.room.owner.toString()) {
      next();
    } else {
      res.redirect('/auth/login');
    }
  };
}

module.exports = {
  hasUser,
  isGuest,
  hasRole,
  isOwner
};