const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    //console.log("Token  " + token);
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        //console.log(err);
        return res.status(200).send({
          
          message: "Auth Failed",
          success: false,
        });
      } else {
        req.body.userId = decode.id;
        next();
      }
    });
  } catch (error) {
    //console.log("Error--->" + error);
    res.status(401).send({
      message: "Auth Failed",
      success: false,
    });
  }
};