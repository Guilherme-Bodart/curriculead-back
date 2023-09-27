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
  },
  birthday: {
    type: Date,
  },
  phone: {
    type: String,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  github: {
    type: String,
  },
  curriculumId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Curriculum",
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
