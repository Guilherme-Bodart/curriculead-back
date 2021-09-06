const express = require("express");
const authMiddleware = require("../middlewares/auth");

const Curriculo = require("../models/curriculo");
const Idioma = require("../models/idioma");
const Usuario = require("../models/usario");

const router = express.Router();

router.use(authMiddleware);

router.get("/", async (req, res) => {
  try {
    const curriculos = await Curriculo.find();
    return res.send({ curriculos });
  } catch (err) {
    return res.status(400).send({ error: "Erro em carregar os currículos" });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const curriculos = await Curriculo.find();
    return res.send({ curriculos });
  } catch (err) {
    return res.status(400).send({ error: "Erro em carregar os currículos" });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      cursosExtra,
      estilo,
      expProfissional,
      formacao,
      habilidades,
      idiomas,
      sobreMim,
      qualPessoais,
      objetivos,
      outros,
    } = req.body;

    const usuario = await Usuario.findById(req.usuarioId);

    const curriculo = await Curriculo.create({
      usuarioId: req.usuarioId,
      cursosExtra,
      estilo,
      expProfissional,
      formacao,
      habilidades,
      idiomas,
      sobreMim,
      qualPessoais,
      objetivos,
      outros,
    });
    usuario.curriculo = curriculo
    await curriculo.save();
    await usuario.save();

    return res.send({ curriculo });
  } catch (err) {
    return res.status(400).send({ error: err });
  }
});

router.put("/:curriculoId", async (req, res) => {
  try {
    const {
      cursosExtra,
      estilo,
      expProfissional,
      formacao,
      habilidades,
      idiomas,
      sobreMim,
      qualPessoais,
      objetivos,
      outros,
    } = req.body;

    var curriculo = await Curriculo.findById(req.params.curriculoId)
  
    curriculo.cursosExtra = cursosExtra
    curriculo.estilo = estilo 
    curriculo.expProfissional = expProfissional
    curriculo.formacao = formacao
    curriculo.habilidades = habilidades
    curriculo.idiomas = idiomas
    curriculo.sobreMim = sobreMim
    curriculo.qualPessoais = qualPessoais
    curriculo.objetivos = objetivos
    curriculo.outros = outros

    await curriculo.save()
    return res.send({ curriculo });

  } catch (err) {
    return res.status(400).send({ error: err });
  }
});

router.post("/:userId", async (req, res) => {
  res.send({});
});

module.exports = (app) => app.use("/curriculo", router);
