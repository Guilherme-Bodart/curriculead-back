const mongoose = require("../../database");

const ProfessionalExperienceSchema = new mongoose.Schema({
  responsibility: {
    type: String,
    required: true,
  },
  office: {
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
  currentPosition: {
    type: Boolean,
    required: true,
    default: false
  },
  employer: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }
});

const ProfessionalExperience = mongoose.model(
  "ProfessionalExperience",
  ProfessionalExperienceSchema
);

module.exports = ProfessionalExperience;
