const mongoose = require("../../database");

const CurriculumSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  academicEducation: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "AcademicEducation",
    required: true,
  }],
  extraCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "ExtraCourses",
    required: true,
  }],
  language: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Language",
    required: true,
  }],
  professionalExperience: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProfessionalExperience",
    required: true,
  }],
  skill: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Skill",
    required: true,
  }],
  styleCurriculum: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "StyleCurriculum",
    required: true,
  },
  aboutMe: {
    type: String,
  },
  hobby: [{
    type: String,
  }],
});

const Curriculum = mongoose.model("Curriculum", CurriculumSchema);

module.exports = Curriculum;
