const mongoose = require("../../database");

const CurriculoSchema = new mongoose.Schema({
  usuarioId: {
    type: String,
    require: true,
  },
  cursosExtra: {
      type: Array,
      ref: "CursosExtra",
      require: true,
    },
  expProfissional: {
      type: Array,
      ref: "ExpProfissional",
      require: true,
    },
  estilo: {
      type: Array,
      ref: "Estilo",
      require: true,
    },
  formacao: {
      type: Array,
      ref: "Formacao",
      require: true,
    },
  habilidades: {
      type: Array,
      ref: "Habilidade",
      require: true,
    },
  idiomas:{
      type: Array,
      ref: "Idiomas",
      require: true,
    },
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
