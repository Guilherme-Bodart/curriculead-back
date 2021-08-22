const mongoose = require("../../database");

const HabilidadeSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  nivel: {
    type: Number,
    required: true,
  },
});

const Habilidade = mongoose.model("Habilidade", HabilidadeSchema);

module.exports = Habilidade;
