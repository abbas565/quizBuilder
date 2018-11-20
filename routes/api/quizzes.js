const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const path = require("path");
const isEmpty = require("../../validation/is-empty");

// Question model
const Question = require("../../models/Question");
// Quiz model
const Quiz = require("../../models/Quiz");
// Profile model
const Profile = require("../../models/Profile");

// Validation
const validateQuestionInput = require("../../validation/question");

// @route   GET api/quizzes/test
// @desc    Tests quizzes route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Quizzes Works" }));

// @route   POST api/quizzes
// @desc    Create quizzes
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // const { errors, isValid } = validateQuizzeInput(req.body);
    console.log("quizzes req:", req.body.selectedQueId);
    // // Check Validation
    // if (!isValid) {
    //   // If any errors, send 400 with errors object
    //   console.log("errors are:", errors);
    //   return res.status(400).json(errors);
    // }

    const newQuiz = new Quiz({
      quizName: req.body.quizName,
      selectedQueId: req.body.selectedQueId,
      avatar: req.body.avatar,
      //--user means insteructor----
      user: req.user.id
    });
    console.log("newQuiz is:", newQuiz);
    newQuiz.save().then(quiz => res.json(quiz));
  }
);

// @route   GET api/quizzes
// @desc    Get questions by user
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("Quiz view works....!"),
      Profile.findOne({ user: req.user.id }).then(profile => {
        if (req.user.name.toLowerCase() !== "admin") {
          Quiz.find({ user: req.user.id })
            .sort({ date: -1 })
            .then(quizzes => {
              res.json(quizzes);
              console.log("quizzes are in api:", quizzes);
            })
            .catch(err =>
              res
                .status(404)
                .json({ noquestionfound: "No quiz found for this user" })
            );
        } else {
          Quiz.find()
            .sort({ date: -1 })
            .then(quizzes => {
              // Show question
              res.json(quizzes);
              console.log("quizzes are in api:", quizzes);
            })
            .catch(err =>
              res.status(404).json({ noquestionsfound: "No quiz found" })
            );
        }
      });
  }
);
//--------------------

// // @route   GET api/questions/:id
// // @desc    Get question by id
// // @access  Private
// router.get(
//   "/:id",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     Profile.findOne({ user: req.user.id }).then(profile => {
//       Question.findById(req.params.id)
//         .then(question => {
//           // Check for question owner
//           if (
//             question.user.toString() !== req.user.id &&
//             req.user.name.toLowerCase() !== "admin"
//           ) {
//             return res
//               .status(401)
//               .json({ notauthorized: "User not authorized" });
//           } else {
//             // Show question
//             res.json(question);
//           }
//         })
//         .catch(err =>
//           res
//             .status(404)
//             .json({ noreportfound: "No question found with that ID" })
//         );
//     });
//   }
// );

// // @route   DELETE api/questions/:id
// // @desc    Delete question
// // @access  Private
// router.delete(
//   "/:id",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     Profile.findOne({ user: req.user.id }).then(profile => {
//       Question.findById(req.params.id)
//         .then(question => {
//           // Check for question owner
//           //------------
//           console.log("User name is:", req.user);
//           //---------
//           if (
//             //question.user.toString() !== req.user.id &&
//             req.user.name.toLowerCase() !== "admin"
//           ) {
//             return res
//               .status(401)
//               .json({ notauthorized: "User not authorized" });
//           }

//           // Delete
//           question.remove().then(() => res.json({ success: true }));
//         })
//         .catch(err =>
//           res.status(404).json({ reportnotfound: "No question found" })
//         );
//     });
//   }
// );

module.exports = router;
