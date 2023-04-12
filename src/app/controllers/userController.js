const express = require("express");
const authMiddleware = require("../middlewares/auth");

const User = require("../models/user");

const router = express.Router();

router.use(authMiddleware);

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    return res.send({ users });
  } catch (err) {
    return res.status(400).send({ error: "Error loading users" });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const user = await User.find();
    return res.send({ user });
  } catch (err) {
    return res.status(400).send({ error: "Error loading user" });
  }
});

router.put("/:userId", async (req, res) => {
  try {
    const {
      email,
      name,
      gender,
      birthday,
      phone,
      state,
      city,
      district,
      street,
      complement,
      linkedin,
      github,
      curriculum,
    } = req.body;

    var user = await User.findById(req.params.userId);
    if (email != user.email) {
      if (await User.findOne({ email })) {
        return res.status(400).send({ error: "E-mail already register" });
      }
    }

    user.email = email;
    user.name = name;
    user.gender = gender;
    user.birthday = birthday;
    user.phone = phone;
    user.state = state;
    user.city = city;
    user.district = district;
    user.street = street;
    user.complement = complement;
    user.linkedin = linkedin;
    user.github = github;
    user.curriculum = curriculum;

    await user.save();
    return res.send({ user });

  } catch (err) {
    return res.status(400).send({ error: err });
  }
});

module.exports = (app) => app.use("/user", router);
