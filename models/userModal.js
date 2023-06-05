const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name"],
    uppercase: true,
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email",
    },
  },
  password: {
    type: String,
    required: [true, "Provide a password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Provide a confirm password"],
    validate: {
      validator: function (value) {
        return this.password === value;
      },
      message: "Password and confirm password must be the same",
    },
  },
});

userSchema.pre("save", async function (next) {
  // Check if password is modified
  if (!this.isModified("password")) {
    return next();
  }

  // Encrypting password
  this.password = await bcrypt.hash(this.password, 12);

  //   Delete confirm password
  this.passwordConfirm = undefined;

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
