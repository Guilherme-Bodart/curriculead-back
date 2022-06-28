const mongoose = require("../../database");

const LanguageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
});

const Language = mongoose.model("Language", LanguageSchema);

module.exports = Language;
