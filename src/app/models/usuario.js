const mongoose = require("../../database");
const bcrypt = require("bcryptjs");

const UsuarioSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  nome: {
    type: String,
    required: true,
  },
  senha: {
    type: String,
    required: true,
    select: false,
  },
  senhaResetToken: {
    type: String,
    select: false,
  },
  senhaResetExpires: {
    type: Date,
    select: false,
  },
  sexo: {
    type: Number,
    required: true,
  },
  dataNascimento: {
    type: Date,
    required: true,
  },
  telefone: {
    type: Number,
    required: true,
  },
  estado: {
    type: String,
    required: true,
  },
  cidade: {
    type: String,
    required: true,
  },
  bairro: {
    type: String,
    required: true,
  },
  rua: {
    type: String,
    required: true,
  },
  numero: {
    type: Number,
    required: true,
  },
  complemento: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  curriculo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Curriculo",
  },
});

const Usuario = mongoose.model("Usuario", UsuarioSchema);

module.exports = Usuario;
