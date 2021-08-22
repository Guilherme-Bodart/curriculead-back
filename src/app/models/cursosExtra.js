const mongoose = require("../../database");

const CursosExtraSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  cargaHoras: {
    type: Number,
    required: true,
  },
});

const CursosExtra = mongoose.model("CursosExtra", CursosExtraSchema);

module.exports = CursosExtra;
