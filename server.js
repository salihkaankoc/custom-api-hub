const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const apiKeyRoutes = require("./routes/apiKey");
const todoRoutes = require("./routes/todo");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
// Ortam değişkenlerini yükle
dotenv.config();

// MongoDB'yi başlat
connectDB();

// Express uygulamasını başlat
const app = express();

// Middleware'ler
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/key", apiKeyRoutes);
app.use("/api/todos", todoRoutes);
// Swagger Route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Ana Route
app.get("/", (req, res) => {
  res.send("Custom API Hub - Server Çalışıyor 🚀");
});

// Port ayarı
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server çalışıyor: http://localhost:${PORT}`);
});
