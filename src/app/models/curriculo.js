const mongoose = require("../../database");

const CurriculoSchema = new mongoose.Schema({
  cursosExtra: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CursosExtra",
      default: [],
    },
  ],
  expProfissional: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ExpProfissional",
      default: [],
    },
  ],
  estilo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Estilo",
      default: [],
    },
  ],
  formacao: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Formacao",
      default: [],
    },
  ],
  habilidades: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Habilidade",
      default: [],
    },
  ],
  idiomas: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Idiomas",
      default: [],
    },
  ],
  sobreMim: {
    type: String,
  },
  qualPessoais: {
    type: String,
  },
  objetivos: {
    type: String,
  },
  outros: {
    type: String,
  },
});

const Curriculo = mongoose.model("Curriculo", CurriculoSchema);

module.exports = Curriculo;
