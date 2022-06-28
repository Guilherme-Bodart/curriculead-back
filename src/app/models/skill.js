const mongoose = require("../../database");

const SkillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
});

const Skill = mongoose.model("Skill", SkillSchema);

module.exports = Skill;
