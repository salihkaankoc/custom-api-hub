const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token eksik veya hatalı format." });
  }

  const token = authHeader.split(" ")[1]; // Bearer kısmını kesip token'ı al

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Token'dan kullanıcı ID'sini al
    next();
  } catch (error) {
    res.status(401).json({ message: "Geçersiz token.", error: error.message });
  }
};
