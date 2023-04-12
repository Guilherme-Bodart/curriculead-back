const express = require("express");
const authMiddleware = require("../middlewares/auth");

const User = require("../models/user");
const Curriculum = require("../models/curriculum");
const AcademicEducation = require("../models/academicEducation");
const ProfessionalExperience = require("../models/professionalExperience");
const Skill = require("../models/skill");
const ExtraCourses = require("../models/extraCourse");
const Language = require("../models/language");

const router = express.Router();

router.use(authMiddleware);

router.get("/", async (req, res) => {
  try {
    const curriculum = await Curriculum.find();
    return res.send({ curriculum });
  } catch (err) {
    return res.status(400).send({ error: "Error loading curriculum" });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.usuarioId).populate('curriculum');
    const curriculum = await Curriculum.find(user.curriculum._id).populate(['academicEducation', 'extraCourses', 'language', 'professionalExperience', 'styleCurriculum', 'skill']);
    return res.send({ curriculum });
  } catch (err) {
    return res.status(400).send({ error: "Error loading curriculum" });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      extraCourses,
      styleCurriculum,
      professionalExperience,
      academicEducation,
      skill,
      language,
      aboutMe,
      hobby,
    } = req.body;

    const usuario = await User.findById(req.usuarioId);

    for (const item of extraCourses) {
      let extCr = await ExtraCourses.create(item);
      user.extraCourses.push(extCr._id);
    }

    for (const item of academicEducations) {
      let acadEdu = await AcademicEducation.create(item);
      user.academicEducations.push(acadEdu._id);
    }

    for (const item of language) {
      let lngu = await Language.create(item);
      user.academicEducations.push(lngu._id);
    }

    for (const item of professionalExperience) {
      let prfExp = await ProfessionalExperience.create(item);
      user.academicEducations.push(prfExp._id);
    }

    for (const item of skill) {
      let skl = await Skill.create(item);
      user.academicEducations.push(skl._id);
    }

    const curriculum = await Curriculum.create({
      usuarioId: req.usuarioId,
      extraCourses,
      styleCurriculum,
      professionalExperience,
      academicEducation,
      skill,
      language,
      aboutMe,
      hobby,
    });

    usuario.curriculum = curriculum

    await usuario.save();

    return res.send({ curriculum });
  } catch (err) {
    return res.status(400).send({ error: err });
  }
});

router.put("/:curriculumId", async (req, res) => {
  try {
    const {
      extraCourses,
      styleCurriculum,
      professionalExperience,
      academicEducation,
      skill,
      language,
      aboutMe,
      hobby,
    } = req.body;


    var curriculum = await Curriculum.findById(req.params.curriculumId)


    for (const item of extraCourses) {
      if (!item._id) {
        delete item._id
        let extCr = await ExtraCourses.create(item);
        user.extraCourses.push(extCr._id);
      } else {
        await ExtraCourses.findOneAndUpdate({ _id: item._id }, item, { upsert: true, new: true });
      }
    }

    for (const item of academicEducations) {
      if (!item._id) {
        delete item._id
        let acadEdu = await AcademicEducation.create(item);
        user.academicEducations.push(acadEdu._id);
      } else {
        await AcademicEducation.findOneAndUpdate({ _id: item._id }, item, { upsert: true, new: true });
      }
    }

    for (const item of language) {
      if (!item._id) {
        delete item._id
        let lngu = await Language.create(item);
        user.academicEducations.push(lngu._id);
      } else {
        await Language.findOneAndUpdate({ _id: item._id }, item, { upsert: true, new: true });
      }
    }

    for (const item of professionalExperience) {
      if (!item._id) {
        delete item._id
        let prfExp = await ProfessionalExperience.create(item);
        user.academicEducations.push(prfExp._id);
      } else {
        await ProfessionalExperience.findOneAndUpdate({ _id: item._id }, item, { upsert: true, new: true });
      }
    }

    for (const item of skill) {
      if (!item._id) {
        delete item._id
        let skl = await Skill.create(item);
        user.academicEducations.push(skl._id);
      } else {
        await Skill.findOneAndUpdate({ _id: item._id }, item, { upsert: true, new: true });
      }
    }

    curriculum.extraCourses = extraCourses
    curriculum.styleCurriculum = styleCurriculum
    curriculum.professionalExperience = professionalExperience
    curriculum.academicEducation = academicEducation
    curriculum.skill = skill
    curriculum.language = language
    curriculum.aboutMe = aboutMe
    curriculum.hobby = hobby

    await curriculum.save()
    return res.send({ curriculum });

  } catch (err) {
    return res.status(400).send({ error: err });
  }
});

router.post("/:userId", async (req, res) => {
  res.send({});
});

module.exports = (app) => app.use("/curriculum", router);
