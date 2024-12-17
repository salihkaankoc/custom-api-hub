const express = require("express");
const apiKeyMiddleware = require("../middleware/apiKeyMiddleware");
const rateLimitMiddleware = require("../middleware/rateLimitMiddleware");

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: Todo listesi işlemleri
 */

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Todo listesini getir
 *     description: API anahtarı ile korunan bir route. Tüm todo listesini döner.
 *     tags: [Todos]
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Başarıyla todo listesi döner.
 *       401:
 *         description: Geçersiz API Anahtarı.
 */
router.get("/", apiKeyMiddleware, rateLimitMiddleware, (req, res) => {
  const todos = [
    { id: 1, task: "Proje oluştur", completed: true },
    { id: 2, task: "API anahtarı ekle", completed: true },
    { id: 3, task: "Rate limiting yap", completed: false },
  ];

  res.status(200).json({ message: "Todo listesi", data: todos });
});

module.exports = router;
