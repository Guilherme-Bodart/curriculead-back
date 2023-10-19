const mongoose = require("../../database");

const styleCurriculumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});

const styleCurriculum = mongoose.model("StyleCurriculum", styleCurriculumSchema);

module.exports = styleCurriculum;
