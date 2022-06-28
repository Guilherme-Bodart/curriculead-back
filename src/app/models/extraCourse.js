const mongoose = require("../../database");

const ExtraCourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  institution: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  }
});

const ExtraCourse = mongoose.model("ExtraCourse", ExtraCourseSchema);

module.exports = ExtraCourse;
