const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Kullanıcı kimlik doğrulama işlemleri
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Yeni kullanıcı oluştur
 *     description: Kullanıcı adı, e-posta ve şifre ile yeni bir kullanıcı oluşturur.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: Kullanıcı başarıyla kaydedildi.
 *       400:
 *         description: Bu e-posta zaten kayıtlı.
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Kullanıcı girişi
 *     description: E-posta ve şifre ile giriş yapar ve JWT token döner.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Giriş başarılı, JWT token döner.
 *       400:
 *         description: Geçersiz e-posta veya şifre.
 */
// Kullanıcı Kaydı
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Kullanıcı zaten var mı kontrolü
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Bu e-posta zaten kayıtlı." });
    }

    // Şifreyi hash'le
    const hashedPassword = await bcrypt.hash(password, 10);

    // Yeni kullanıcı oluştur
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Kullanıcı başarıyla kaydedildi.", user });
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
});

// Kullanıcı Girişi
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kullanıcıyı bul
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Geçersiz e-posta veya şifre." });
    }

    // Şifre doğrulama
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Geçersiz e-posta veya şifre." });
    }

    // JWT oluştur
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Giriş başarılı.", token });
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
});

module.exports = router;
