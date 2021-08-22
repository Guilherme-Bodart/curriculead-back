const mongoose = require("../../database");

const EstiloSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  cor: {
    type: String,
    required: true,
  },
});

const Estilo = mongoose.model("Estilo", EstiloSchema);

module.exports = Estilo;
