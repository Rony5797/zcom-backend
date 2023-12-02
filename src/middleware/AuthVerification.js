const { DecodeToken } = require("../util/TokenHelper");

module.exports = (req, res, next) => {
  const token = req.headers["token"];

  //verify the token
  const decoded = DecodeToken(token);
  
  if (decoded === null) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  } else {
    const email = decoded["email"];
    const id = decoded["id"];
    req.headers.email = email;
    req.headers.id = id;

    next();
  }
};
