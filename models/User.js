const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Aynı e-posta adresini engeller
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Oluşturulma ve güncellenme tarihini tutar
);

const User = mongoose.model("User", userSchema);
module.exports = User;
