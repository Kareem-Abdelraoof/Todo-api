const jwt = require("jsonwebtoken");
const CustomError = require('./CustomError');

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
    return next(new CustomError(401,"Authentication token is required"))
  }
  const token = auth.split(" ")[1];

    // verify the token and check the expiration date
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log(`the decoded data is ${decoded}`);
    
    // return the userId to at the req
    req.userId = decoded.userId;
    req.token = token;
    next();
}
module.exports = { generateWebToken, verifyWebToken };
