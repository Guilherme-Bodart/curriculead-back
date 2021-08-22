const mongoose = require("../../database");

const IdiomaSchema = new mongoose.Schema({
  nome: {
    type: String,
    require: true,
  },
  nivel: {
    type: Number,
    require: true,
  },
});

const Idioma = mongoose.model("Idioma", IdiomaSchema);

module.exports = Idioma;
