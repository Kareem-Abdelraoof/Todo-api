const jwt = require("jsonwebtoken");

function generateWebToken(userId, options = { expiresIn: "1d" }) {
  const payload = {
    userId,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

function verifyWebToken(req, res, next) {
  // get the toke and check if it exists
  const auth = req.headers.authorization;
  if (!auth) {
    res.status(401).json({ message: "no token provided" });
  }
  const token = auth.split(" ")[1];
  try {
    // verify the token and check the expiration date
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // return the userId to at the req
    req.userId = decoded.userId;
    req.token = token;
    console.log(token);

    next();
  } catch (err) {
    res
      .status(400)
      .json({ message: `there was an error`, errMessage: err.message });
  }
}
module.exports = { generateWebToken, verifyWebToken };
