const mongoose = require("../../database");

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
});

const skill = mongoose.model("Skill", skillSchema);

module.exports = skill;
