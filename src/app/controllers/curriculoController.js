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
    const user = await User.findById(req.params.usuarioId).populate(
      "curriculum"
    );
    const curriculum = await Curriculum.find(user.curriculum._id).populate([
      "academicEducation",
      "extraCourses",
      "language",
      "professionalExperience",
      "styleCurriculum",
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

        // Copia essa linha pra testar no insomnia
    // {"className":"Currículo","url":"outrigger","academicEducation":[{"className":"Educação Acadêmica","courseName":"bb","schoolName":"bb","startDate":"2023-10-11T03:00:00.000Z","endDate":"2023-10-14T03:00:00.000Z"}],"extraCourses":[],"language":[{"className":"Idiomas","name":"ingles","level":4}],"professionalExperience":[{"className":"Experiência Profissional","responsibility":"aa","employer":"aa","description":"aa","startDate":"2023-10-17T03:00:00.000Z","endDate":"2023-10-20T03:00:00.000Z","currentPosition":false},{"className":"Experiência Profissional","responsibility":"ab","employer":"ab","description":"ab","startDate":"2023-10-11T03:00:00.000Z","endDate":"2023-10-15T03:00:00.000Z","currentPosition":false}],"skill":[{"className":"Cursos Extras","name":"react","level":6},{"className":"Cursos Extras","name":"angular","level":7}],"styleCurriculum":{"className":"Estilo do Currículo","name":"","color":""},"aboutMe":"sobre mim","hobby":[]}


    const usuario = await User.findById(req.usuarioId);

    // Não sei se essa parte aqui dos for's são erradas, ja que eu fiz um modelo pra cada um eu to fazendo isso pra criar esse modelo, mas se precisar posso arrancar os modelos tudo e seguir apenas com listas de objetos 'simples'
    extraCourses.forEach(async (element, index) => {
      element = await ExtraCourses.create(element);
    });

    academicEducation.forEach(async (element, index) => {
      element = await AcademicEducation.create(element);
    });

    language.forEach(async (element, index) => {
      element = await Language.create(element);
    });

    professionalExperience.forEach(async (element, index) => {
      element = await ProfessionalExperience.create(element);
    });

    skill.forEach(async (element, index) => {
      element = await Skill.create(element);
    });

    const curriculum = await Curriculum.create({
      usuarioId: req.usuarioId,
      url,
      extraCourses,
      styleCurriculum,
      professionalExperience,
      academicEducation,
      skill,
      language,
      aboutMe,
      hobby,
    });
    console.log(curriculum);
    await curriculum.save();

    usuario.curriculumId = curriculum._id;

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

    var curriculum = await Curriculum.findById(req.params.curriculumId);
    console.log(curriculum);
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
