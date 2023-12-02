const jwt = require("jsonwebtoken");

const EncodeToken = (email, user_id) => {
  return jwt.sign({ email: email, id: user_id }, process.env.SECRATE_KAY, {
    expiresIn: "1h",
  });
};

const DecodeToken = (token) => {
  return jwt.verify(token, process.env.SECRATE_KAY, (err, decoded) => {
    if (err) {
      // Token verification failed
      return null;
    } else {
      // Token decoded successfully
      return decoded;
    }
  });
};

module.exports = { EncodeToken, DecodeToken };
