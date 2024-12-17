const swaggerJSDoc = require("swagger-jsdoc");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Custom API Hub",
      version: "1.0.0",
      description: "Custom API Hub - API Dokümantasyonu",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Geliştirme Sunucusu",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
        ApiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "x-api-key",
          description: "API Anahtarı burada gönderilir.",
        },
      },
    },
    security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
  },
  apis: ["./routes/*.js"], // Route dosyalarından dökümantasyonu çeker
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = swaggerSpec;
