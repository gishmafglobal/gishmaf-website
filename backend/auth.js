const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.sendStatus(401);

  jwt.verify(token, "SECRET_KEY", (err) => {
    if (err) return res.sendStatus(403);
    next();
  });
};
