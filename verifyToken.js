const func = function verifyToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (bearerHeader) {
      let bearer = bearerHeader.split(" ")[1];
      req.token = bearer;
      next();
    } else {
      res.sendStatus(403);
    }
  };
  
  module.exports = func;
  