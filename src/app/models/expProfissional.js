const mongoose = require("../../database");

const ExpProfissionalSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  dataInicio: {
    type: Date,
    required: true,
  },
  dataFim: {
    type: Date,
    required: true,
  },
});

const ExpProfissional = mongoose.model(
  "ExpProfissional",
  ExpProfissionalSchema
);

module.exports = ExpProfissional;
