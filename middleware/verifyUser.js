const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token = req.cookies.access_token;
  
  if (!token) {
  return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  
  try {
  const user = jwt.verify(token, process.env.JWT_SECRET);
  req.user = user;
  } catch (error) {
  return res.status(403).json({ success: false, message: "Forbidden" });
  }
  
  next();
  };

module.exports = verifyToken;