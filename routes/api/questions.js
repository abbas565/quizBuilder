const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const path = require("path");
const isEmpty = require("../../validation/is-empty");

// Storage strategy
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

// Multer initialized
const fileFilter = (req, file, cb) => {
  // Allowed ext
  const filetype = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetype.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetype.test(file.mimetype);

  if (mimetype && extname) {
    // console.log("file data is:", file);
    cb(null, true);
  } else {
    cb("Only Image (jpeg, jpg, png or gif)!");
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 0.5
  },
  fileFilter: fileFilter
}).single("questionImage");

// Question model
const Question = require("../../models/Question");
// Profile model
const Profile = require("../../models/Profile");

// Validation
const validateQuestionInput = require("../../validation/question");

// @route   GET api/questions/test
// @desc    Tests questions route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Questions Works" }));

// @route   POST api/questions
// @desc    Create question
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    upload(req, res, err => {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        // console.log("Multer error:", err.message);
        const { errors } = validateQuestionInput(req.body);
        errors.questionImage = err.message;
        // If any errors, send 400 with errors object
        console.log("errors are:", errors);
        return res.status(400).json(errors);
      } else if (err) {
        const { errors } = validateQuestionInput(req.body);
        errors.questionImage = err;
        // If any errors, send 400 with errors object
        console.log("errors are:", errors);
        return res.status(400).json(errors);
      } else {
        // console.log("up loaded formData is:", req.body);
        // console.log("up loaded image is:", req.file);

        const { errors, isValid } = validateQuestionInput(req.body);

        // Check Validation
        if (!isValid) {
          // If any errors, send 400 with errors object
          console.log("errors are:", errors);
          return res.status(400).json(errors);
        }

        const imagePath = !isEmpty(req.file) ? req.file.path : null;

        const newQuestion = new Question({
          mainText: req.body.mainText,
          referenceBook: req.body.referenceBook,
          answers: {
            answer01: {
              ansText: req.body.answerText01,
              ansCorrect: req.body.answerCorrect01
            },
            answer02: {
              ansText: req.body.answerText02,
              ansCorrect: req.body.answerCorrect02
            },
            answer03: {
              ansText: req.body.answerText03,
              ansCorrect: req.body.answerCorrect03
            },
            answer04: {
              ansText: req.body.answerText04,
              ansCorrect: req.body.answerCorrect04
            }
          },
          courseId: req.body.courseId,
          courseLevel: req.body.courseLevel,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id,
          questionImage: imagePath
        });

        newQuestion.save().then(question => res.json(question));
      }
    });
  }
);

// @route   GET api/questions
// @desc    Get questions by user
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      if (req.user.name.toLowerCase() !== "admin") {
        Question.find({ user: req.user.id })
          .sort({ date: -1 })
          .then(questions => {
            res.json(questions);
          })
          .catch(err =>
            res
              .status(404)
              .json({ noquestionfound: "No question found for this user" })
          );
      } else {
        Question.find()
          .sort({ date: -1 })
          .then(questions => {
            // Show question
            res.json(questions);
          })
          .catch(err =>
            res.status(404).json({ noquestionsfound: "No questions found" })
          );
      }
    });
  }
);
//--------------------

// @route   GET api/questions/:id
// @desc    Get question by id
// @access  Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Question.findById(req.params.id)
        .then(question => {
          // Check for question owner
          if (
            question.user.toString() !== req.user.id &&
            req.user.name.toLowerCase() !== "admin"
          ) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          } else {
            // Show question
            res.json(question);
          }
        })
        .catch(err =>
          res
            .status(404)
            .json({ noreportfound: "No question found with that ID" })
        );
    });
  }
);

// @route   DELETE api/questions/:id
// @desc    Delete question
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Question.findById(req.params.id)
        .then(question => {
          // Check for question owner
          //------------
          console.log("User name is:", req.user);
          //---------
          if (
            //question.user.toString() !== req.user.id &&
            req.user.name.toLowerCase() !== "admin"
          ) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }

          // Delete
          question.remove().then(() => res.json({ success: true }));
        })
        .catch(err =>
          res.status(404).json({ reportnotfound: "No question found" })
        );
    });
  }
);

module.exports = router;
