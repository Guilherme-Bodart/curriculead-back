const express = require("express");

const bcrypt = require("bcryptjs");

const crypto = require("crypto");

const mailer = require("../../module/mailer");

const jwt = require("jsonwebtoken");

const authConfig = require("../../config/auth.json");

const Usuario = require("../models/usario");
const Curriculo = require("../models/curriculo");

const router = express.Router();

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
}

router.post("/register", async (req, res) => {
  var {
    email,
    senha,
    nome,
    sexo,
    dataNascimento,
    telefone,
    estado,
    cidade,
    bairro,
    rua,
    complemento,
    linkedin,
    curriculo,
  } = req.body;

  if (email === "" || email === undefined) {
    return res.status(400).send({ error: "Campo E-Mail vazio" });
  } else if (senha === "" || senha === undefined) {
    return res.status(400).send({ error: "Campo Senha vazio" });
  } else if (nome === "" || nome === undefined) {
    return res.status(400).send({ error: "Campo Nome vazio" });
  }

  try {
    if (await Usuario.findOne({ email })) {
      return res.status(400).send({ error: "E-mail já cadastrado" });
    }

    var usuario;

    const hash = await bcrypt.hash(senha, 10);
    senha = hash;

    usuario = await Usuario.create({
      email,
      senha,
      nome,
      sexo,
      dataNascimento,
      telefone,
      estado,
      cidade,
      bairro,
      rua,
      complemento,
      linkedin,
      curriculo,
    });
    usuario.senha = undefined;

    return res.send({
      usuario,
      token: generateToken({ id: usuario._id }),
    });
  } catch (err) {
    return res.status(400).send({
      error: "Erro ao criar o usuário",
    });
  }
});

router.post("/authenticate", async (req, res) => {
  var { email, senha } = req.body;
  const usuario = await Usuario.findOne({ email }).select("+senha");

  if (!usuario) {
    return res.status(400).send({
      error: "usuário não encontrado",
    });
  }

  if (!(await bcrypt.compare(senha, usuario.senha))) {
    return res.status(400).send({
      error: "senha inválida",
    });
  }

  usuario.senha = undefined;

  res.send({
    usuario,
    token: generateToken({ id: usuario.id }),
  });

  return res.status(200);
});

router.get("/", async (req, res) => {
  try {
    const usuarios = await Usuario.find({});
    return res.send({ usuarios });
  } catch (err) {
    return res.status(400).send({ error: "Erro em carregar os usuários" });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.userId);
    const curriculo = await Curriculo.findById(usuario.curriculo);
    return res.send({ usuario, curriculo });
  } catch (err) {
    return res.status(400).send({ error: "Erro em carregar os usuários" });
  }
});

router.post("/forgot_password", async (req, res) => {
  var { email } = req.query;
  if (email === undefined) {
    email = req.body.email;
  }

  try {
    const usuario = await Usuario.findOne({ status: 1, email });

    if (!usuario) {
      return res.status(400).send({
        error: "Usuário não encontrado",
      });
    }

    const token = crypto.randomBytes(20).toString("hex");
    const now = new Date();
    now.setHours(now.getHours() + 1);

    await Usuario.findByIdAndUpdate(usuario.id, {
      $set: {
        senhaResetToken: token,
        senhaResetExpires: now,
      },
    });

    mailer.sendMail(
      {
        to: email,
        from: "CurricuLEAD <curriculeads@gmail.com>",
        subject: "Recuperação de Senha",
        template: "forgot_password",
        context: { token },
      },
      (err) => {
        if (err) {
          return res.status(400).send({ error: err });
        }
        return res.send();
      }
    );
  } catch (err) {
    res.status(400).send({ error: "Erro ao recuperar senha, tente novamente" });
  }
});

router.post("/reset_password", async (req, res) => {
  var { senha, token } = req.query;
  if (senha === undefined) {
    var { senha, token } = req.body;
  }

  try {
    const usuario = await Usuario.findOne({ senhaResetToken: token }).select(
      "+senhaResetToken senhaResetExpires"
    );

    if (!usuario) {
      return res.status(400).send({
        error: "usuário não encontrado",
      });
    }

    if (token !== usuario.senhaResetToken) {
      return res.status(400).send({
        error: "token invalido",
      });
    }

    const now = new Date();

    if (now > usuario.senhaResetToken) {
      return res.status(400).send({
        error: "token expirado",
      });
    }

    const hash = await bcrypt.hash(senha, 10);
    senha = hash;
    usuario.senha = senha;

    await usuario.save();

    res.send();
  } catch (err) {
    res.status(400).send({ error: "Erro ao recuperar senha, tente novamente" });
  }
});

module.exports = (app) => app.use("/auth", router);
