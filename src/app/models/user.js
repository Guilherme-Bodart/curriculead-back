const mongoose = require("../../database");
const bcrypt = require("bcryptjs");
const { Gender } = require("./enumerators/gender.enum");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  passwordResetToken: {
    type: String,
    select: false,
  },
  passwordResetExpires: {
    type: Date,
    select: false,
  },
  gender: {
    type: String,
    enum: Gender,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  number: {
    type: String,
  },
  complement: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  curriculum: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Curriculum",
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
