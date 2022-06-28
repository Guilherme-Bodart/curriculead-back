const mongoose = require("../../database");

const StyleCurriculumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});

const StyleCurriculum = mongoose.model("StyleCurriculum", StyleCurriculumSchema);

module.exports = StyleCurriculum;
