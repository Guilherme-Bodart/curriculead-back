const express = require("express");
const authMiddleware = require("../middlewares/auth");
const router = express.Router();
router.use(authMiddleware);

const User = require("../models/user");
const Curriculum = require("../models/curriculum");
const AcademicEducation = require("../models/academicEducation");
const ProfessionalExperience = require("../models/professionalExperience");
const Skill = require("../models/skill");
const ExtraCourses = require("../models/extraCourses");
const StyleCurriculum = require("../models/styleCurriculum");
const Language = require("../models/language");

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
    const user = await User.findById(req.params.userId);
    const curriculum = await Curriculum.find(user.curriculumId).populate([
      "academicEducation",
      "styleCurriculum",
      "language",
      "extraCourses",
      "professionalExperience",
      "skill",
    ]);
    return res.send({ curriculum });
  } catch (err) {
    return res.status(400).send({ error: "Error loading curriculum" });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      extraCourses,
      url,
      styleCurriculum,
      professionalExperience,
      academicEducation,
      skill,
      language,
      aboutMe,
      hobby,
    } = req.body;

    const usuario = await User.findById(req.usuarioId);
    let c = await Curriculum.findOne({ url });
    if (c) throw new Error('Curriculum URL already exists');

    const newStyleCurriculum = await StyleCurriculum.create(styleCurriculum);

    const extraCoursesIds = await Promise.all(
      extraCourses.map(async (element) => {
        const course = await ExtraCourses.create(element);
        return course._id;
      })
    );

    const academicEducationIds = await Promise.all(
      academicEducation.map(async (element) => {
        const education = await AcademicEducation.create(element);
        return education._id;
      })
    );

    const languageIds = await Promise.all(
      language.map(async (element) => {
        const lang = await Language.create(element);
        return lang._id;
      })
    );

    const professionalExperienceIds = await Promise.all(
      professionalExperience.map(async (element) => {
        const experience = await ProfessionalExperience.create(element);
        return experience._id;
      })
    );

    const skillIds = await Promise.all(
      skill.map(async (element) => {
        const skillDoc = await Skill.create(element);
        return skillDoc._id;
      })
    );

    const curriculum = await Curriculum.create({
      userId: req.usuarioId,
      url,
      extraCourses: extraCoursesIds,
      styleCurriculum: newStyleCurriculum.id,
      professionalExperience: professionalExperienceIds,
      academicEducation: academicEducationIds,
      skill: skillIds,
      language: languageIds,
      aboutMe,
      hobby,
    });

    await curriculum.save();
    usuario.curriculumId = curriculum._id;
    await usuario.save();

    return res.send({ curriculum });
  } catch (err) {
    return res.status(400).send({ error: err.message });
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
      url,
    } = req.body;

    var curriculum = await Curriculum.findById(req.params.curriculumId);

    let c = await Curriculum.findOne({ url });
    if (c && c.url != curriculum.url) throw new Error('URl do currículo já existe');

    for (const item of extraCourses) {
      if (!item._id) {
        delete item._id;
        let extCr = await ExtraCourses.create(item);
        curriculum.extraCourses.push(extCr._id);
      } else {
        await ExtraCourses.findOneAndUpdate({ _id: item._id }, item, {
          upsert: true,
          new: true,
        });
      }
    }

    for (const item of academicEducations) {
      if (!item._id) {
        delete item._id;
        let acadEdu = await AcademicEducation.create(item);
        curriculum.academicEducations.push(acadEdu._id);
      } else {
        await AcademicEducation.findOneAndUpdate({ _id: item._id }, item, {
          upsert: true,
          new: true,
        });
      }
    }

    for (const item of language) {
      if (!item._id) {
        delete item._id;
        let lngu = await Language.create(item);
        curriculum.language.push(lngu._id);
      } else {
        await Language.findOneAndUpdate({ _id: item._id }, item, {
          upsert: true,
          new: true,
        });
      }
    }

    for (const item of professionalExperience) {
      if (!item._id) {
        delete item._id;
        let prfExp = await ProfessionalExperience.create(item);
        curriculum.professionalExperience.push(prfExp._id);
      } else {
        await ProfessionalExperience.findOneAndUpdate({ _id: item._id }, item, {
          upsert: true,
          new: true,
        });
      }
    }

    for (const item of skill) {
      if (!item._id) {
        delete item._id;
        let skl = await Skill.create(item);
        curriculum.skill.push(skl._id);
      } else {
        await Skill.findOneAndUpdate({ _id: item._id }, item, {
          upsert: true,
          new: true,
        });
      }
    }

    curriculum.extraCourses = extraCourses;
    curriculum.styleCurriculum = styleCurriculum;
    curriculum.professionalExperience = professionalExperience;
    curriculum.academicEducation = academicEducation;
    curriculum.skill = skill;
    curriculum.language = language;
    curriculum.aboutMe = aboutMe;
    curriculum.hobby = hobby;
    console.log(curriculum);

    await curriculum.save();
    return res.send({ curriculum });
  } catch (err) {
    return res.status(400).send({ error: err });
  }
});

router.post("/:userId", async (req, res) => {
  res.send({});
});

module.exports = (app) => app.use("/curriculum", router);
