const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    console.log(`the currentt passwored is ${this.password}`);
    this.password = await bcrypt.hash(this.password, 10);
    console.log(`the currentt passwored is ${this.password}`);
  }
  next();
});

// crate collection
const User = mongoose.model("User", userSchema);

module.exports = User;
