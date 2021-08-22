const mongoose = require("../../database");

const FormacaoSchema = new mongoose.Schema({
  nomeCurso: {
    type: String,
    required: true,
  },
  tipoCurso: {
    type: Number,
    required: true,
  },
  nomeInstituicao: {
    type: String,
    required: true,
  },
  situacao: {
    type: Number,
    required: true,
  },
  anoConclusao: {
      type: Number, 
      required: true,
  },
});

const Formacao = mongoose.model("Formacao", FormacaoSchema);

module.exports = Formacao;
