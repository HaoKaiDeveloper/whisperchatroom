const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const authenticateUser = async (req, res, next) => {
  const authToken = req.headers.authorization;

  if (!authToken || !authToken.startsWith("Bearer")) {
    res.status(StatusCodes.UNAUTHORIZED).json({ msg: "授權錯誤" });
    return;
  }
  const token = authToken.split(" ")[1];
  try {
    const { username, email, _id } = jwt.verify(token, process.env.JWT_KEY);
    req.user = { username, email, _id };

    next();
  } catch (err) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "授權錯誤" });
  }
};

module.exports = authenticateUser;
