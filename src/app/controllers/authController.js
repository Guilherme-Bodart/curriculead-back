const express = require("express");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
// const passport = require("passport");
const mailer = require("../../module/mailer");
const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth.json");
const User = require("../models/user");
const Curriculum = require("../models/curriculum");
const ExtraCourses = require("../models/extraCourses");

const router = express.Router();

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
}

router.post("/register", async (req, res) => {
  var {
    email,
    password,
    name,
    gender,
    birthday,
    phone,
    state,
    city,
    linkedin,
    github,
    extraCourses,
    academicEducations,
  } = req.body;
  if (email === "" || email === undefined) {
    return res.status(400).send({ error: "E-mail is null" });
  } else if (password === "" || password === undefined) {
    return res.status(400).send({ error: "Passoword is null" });
  } else if (name === "" || name === undefined) {
    return res.status(400).send({ error: "Name is null" });
  }

  try {
    if (await User.findOne({ email })) {
      return res.status(400).send({ error: "E-mail already register" });
    }

    var user;
    const hash = await bcrypt.hash(password, 10);

    password = hash;
    user = await User.create({
      email,
      password,
      name,
      gender,
      birthday,
      phone,
      state,
      city,
      linkedin,
      github,
      extraCourses,
      academicEducations,
    });

    if (user) await user.save();

    user.password = undefined;
    return res.send({
      user,
      token: generateToken({ id: user._id }),
    });
  } catch (err) {
    return res.status(400).send({
      error: err,
    });
  }
});

router.put("/register", async (req, res) => {
  var {
    email,
    password,
    name,
    gender,
    birthday,
    phone,
    state,
    city,
    linkedin,
    github,
    extraCourses,
    academicEducations,
  } = req.body;

  if (email === "" || email === undefined) {
    return res.status(400).send({ error: "E-mail is null" });
  } else if (password === "" || password === undefined) {
    return res.status(400).send({ error: "Passoword is null" });
  } else if (name === "" || name === undefined) {
    return res.status(400).send({ error: "Name is null" });
  }

  try {
    var usuario = await User.findById(req.usuarioId);

    const hash = await bcrypt.hash(password, 10);
    password = hash;

    usuario.email = email;
    usuario.password = password;
    usuario.name = name;
    usuario.gender = gender;
    usuario.birthday = birthday;
    usuario.phone = phone;
    usuario.state = state;
    usuario.city = city;
    usuario.linkedin = linkedin;
    usuario.github = github;
    usuario.extraCourses = extraCourses;
    usuario.academicEducations = academicEducations;

    await usuario.save();

    user.password = undefined;

    return res.send({
      user,
      token: generateToken({ id: user._id }),
    });
  } catch (err) {
    return res.status(400).send({
      error: err,
    });
  }
});

router.post("/authenticate", async (req, res) => {
  var { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(400).send({
      error: "User not found",
    });
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(400).send({
      error: "Invalid password",
    });
  }

  user.password = undefined;

  res.send({
    user,
    token: generateToken({ id: user.id }),
  });

  return res.status(200);
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    return res.send({ users });
  } catch (err) {
    return res.status(400).send({ error: "Error loading users" });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const curriculum = await Curriculum.findById(user.curriculumId);
    return res.send({ user, curriculum });
  } catch (err) {
    return res.status(400).send({ error: "Error loading users" });
  }
});

router.post("/forgot_password", async (req, res) => {
  var { email } = req.query;
  if (email === undefined) {
    email = req.body.email;
  }

  try {
    const user = await User.findOne({ status: 1, email });

    if (!user) {
      return res.status(400).send({
        error: "User not found",
      });
    }

    const token = crypto.randomBytes(20).toString("hex");
    const now = new Date();
    now.setHours(now.getHours() + 1);

    await User.findByIdAndUpdate(user.id, {
      $set: {
        passwordResetToken: token,
        passwordResetExpires: now,
      },
    });

    mailer.sendMail(
      {
        to: email,
        from: "CurricuLEAD <curriculeads@gmail.com>",
        subject: "Recuperação de password",
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
    res
      .status(400)
      .send({ error: "Error recovering password, try again later" });
  }
});

router.post("/reset_password", async (req, res) => {
  var { password, token } = req.query;
  if (password === undefined) {
    var { password, token } = req.body;
  }

  try {
    const user = await User.findOne({ passwordResetToken: token }).select(
      "+passwordResetToken passwordResetExpires"
    );

    if (!user) {
      return res.status(400).send({
        error: "User not found",
      });
    }

    if (token !== user.passwordResetToken) {
      return res.status(400).send({
        error: "Invalid token",
      });
    }

    const now = new Date();

    if (now > user.passwordResetToken) {
      return res.status(400).send({
        error: "Expired token",
      });
    }

    const hash = await bcrypt.hash(password, 10);
    password = hash;
    user.password = password;

    await user.save();

    res.send();
  } catch (err) {
    res
      .status(400)
      .send({ error: "Error recovering password, try again later" });
  }
});

router.get("/curriculum/:url", async (req, res) => {
  try {
    const curriculum = await Curriculum.findOne({ url: req.params.url }).populate([
      "academicEducation",
      "styleCurriculum",
      "language",
      "extraCourses",
      "professionalExperience",
      "skill",
    ]);
    if (!curriculum) throw new Error('Curriculum URL does not exists');
    res.send({ curriculum });
  } catch (err) {
    res
      .status(400)
      .send({ error: err.message });
  }
});

module.exports = (app) => app.use("/auth", router);
