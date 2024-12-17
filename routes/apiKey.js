const express = require("express");
const jwt = require("jsonwebtoken");
const ApiKey = require("../models/ApiKey");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: API Key
 *   description: Kullanıcı API anahtarı yönetimi
 */

/**
 * @swagger
 * /api/key/generate:
 *   post:
 *     summary: API Anahtarı oluştur
 *     description: Kullanıcı için bir API anahtarı oluşturur.
 *     tags: [API Key]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       201:
 *         description: API Anahtarı başarıyla oluşturuldu.
 *       400:
 *         description: Kullanıcının zaten bir API anahtarı var.
 *       401:
 *         description: Yetkilendirme hatası, token eksik.
 */
// API Anahtarı Oluştur
router.post("/generate", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    // Zaten bir API anahtarı var mı kontrol et
    const existingKey = await ApiKey.findOne({ user: userId });
    if (existingKey) {
      return res.status(400).json({ message: "Zaten bir API anahtarınız var." });
    }

    // Yeni API anahtarı oluştur
    const apiKey = `api_${Math.random().toString(36).substring(2, 15)}`;
    const newApiKey = await ApiKey.create({ user: userId, key: apiKey });

    res.status(201).json({ message: "API Anahtarı oluşturuldu.", key: newApiKey.key });
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
});

module.exports = router;
