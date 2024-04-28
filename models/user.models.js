const mongoose = require("mongoose");

mongoose.connect(`mongodb://127.0.0.1/dbData`);

const userSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    imageURL: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
