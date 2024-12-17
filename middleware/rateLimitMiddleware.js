const rateLimit = {};

const rateLimitMiddleware = (req, res, next) => {
  const apiKey = req.header("x-api-key");

  if (!apiKey) {
    return res.status(401).json({ message: "API Anahtarı eksik." });
  }

  const currentTime = Date.now();
  const windowTime = 60 * 60 * 1000; // 1 saat
  const maxRequests = 100;

  if (!rateLimit[apiKey]) {
    rateLimit[apiKey] = { count: 1, startTime: currentTime };
  } else {
    rateLimit[apiKey].count += 1;

    // Zaman penceresi dolduysa sıfırla
    if (currentTime - rateLimit[apiKey].startTime > windowTime) {
      rateLimit[apiKey] = { count: 1, startTime: currentTime };
    }
  }

  if (rateLimit[apiKey].count > maxRequests) {
    return res.status(429).json({ message: "Çok fazla istek. Lütfen daha sonra tekrar deneyin." });
  }

  next();
};

module.exports = rateLimitMiddleware;
