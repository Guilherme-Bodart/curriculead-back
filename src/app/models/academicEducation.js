const mongoose = require("../../database");

const academicEducationSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  schoolName: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
  },
});

const academicEducation = mongoose.model("AcademicEducation", academicEducationSchema);

module.exports = academicEducation;
