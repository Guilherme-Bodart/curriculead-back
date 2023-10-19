const mongoose = require("../../database");

const extraCourseSchema = new mongoose.Schema({
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

const extraCourses = mongoose.model("ExtraCourses", extraCourseSchema);

module.exports = extraCourses;
