const ApiKey = require("../models/ApiKey");

const apiKeyMiddleware = async (req, res, next) => {
  try {
    const apiKey = req.header("x-api-key");

    if (!apiKey) {
      return res.status(401).json({ message: "API Anahtarı eksik." });
    }

    // Veritabanında API anahtarını kontrol et
    const keyExists = await ApiKey.findOne({ key: apiKey });
    if (!keyExists) {
      return res.status(401).json({ message: "Geçersiz API Anahtarı." });
    }

    // Kullanıcının kimliğini req.user içine ekleyelim
    req.user = keyExists.user;
    next();
  } catch (error) {
    console.error("API Key doğrulama hatası:", error.message);
    res.status(500).json({ message: "Sunucu hatası." });
  }
};

module.exports = apiKeyMiddleware;
