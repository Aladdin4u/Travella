const jwt = require("jsonwebtoken");
const createError = require("../utilis/error");

module.exports = {
  verifyToken: (req, res, next) => {
    const token = req.cookies.access_token;
    console.log(token)
    if (!token) {
      return next(createError(401, "You are not authenticated!"));
    }

    jwt.verify(token, process.env.JWT, (err, user) => {
      if (err) return next(createError(403, "Token is not valid!"));
      req.user = user;
      next();
    });
  },
  verifyUser: () => {
    verifyToken(req, res, next, () => {
      if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
      } else {
        if (err) return next(createError(403, "You are not authorized!"));
      }
    });
  },
  verifyAdmin: () => {
    verifyToken(req, res, next, () => {
      console.log(token)
      if (req.user.isAdmin) {
        next();
      } else {
        if (err) return next(createError(403, "You are not authorized!"));
      }
    });
  },
};
