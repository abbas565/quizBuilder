const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const path = require("path");
const isEmpty = require("../../validation/is-empty");

// Exam model
const Exam = require("../../models/Exam");
// Quiz model
const Quiz = require("../../models/Quiz");
// Profile model
const Profile = require("../../models/Profile");

// Validation
const validateExamInput = require("../../validation/exam");

// @route   GET api/exams/test
// @desc    Tests exams route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Exams Works" }));

// @route   POST api/exams
// @desc    Create exams
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExamInput(req.body);
    console.log("exams req:", req.body.selectedStuId);
    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      console.log("errors are:", errors);
      return res.status(400).json(errors);
    }

    const newExam = new Exam({
      examName: req.body.examName,
      selectedStuId: req.body.selectedStuId,
      sStudents: req.body.sStudents,
      examOwner: req.body.examOwner,
      avatar: req.body.avatar,
      //--user means insteructor----
      user: req.user.id
    });
    console.log("newExam is:", newExam);
    newExam.save().then(exam => res.json(exam));
  }
);

// // @route   GET api/exams
// // @desc    Get exams by user
// // @access  Private
// router.get(
//   "/",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     console.log("Exam view works....!"),
//       Profile.findOne({ user: req.user.id }).then(profile => {
//         if (req.user.name.toLowerCase() !== "admin") {
//           Exam.find({ user: req.user.id })
//             .sort({ date: -1 })
//             .then(exams => {
//               res.json(exams);
//               console.log("exams are in api:", exams);
//             })
//             .catch(err =>
//               res
//                 .status(404)
//                 .json({ noquestionfound: "No exam found for this user" })
//             );
//         } else {
//           Quiz.find()
//             .sort({ date: -1 })
//             .then(exams => {
//               // Show exam
//               res.json(exams);
//               // console.log("exams are in api:", exams);
//             })
//             .catch(err =>
//               res.status(404).json({ noquestionsfound: "No exam found" })
//             );
//         }
//       });
//   }
// );
// //--------------------

// // @route   GET api/quizzes/:id
// // @desc    Get quizzes by id
// // @access  Private
// router.get(
//   "/:id",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     Profile.findOne({ user: req.user.id }).then(profile => {
//       Quiz.findById(req.params.id)
//         .then(quiz => {
//           // Check for question owner
//           if (
//             quiz.user.toString() !== req.user.id &&
//             req.user.name.toLowerCase() !== "admin"
//           ) {
//             return res
//               .status(401)
//               .json({ notauthorized: "User not authorized" });
//           } else {
//             // Show question
//             res.json(quiz);
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

// //----------test
// // @route   DELETE api/quizzes/:id
// // @desc    Delete quiz
// // @access  Private
// router.delete(
//   "/:id",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     Profile.findOne({ user: req.user.id }).then(profile => {
//       Quiz.findById(req.params.id)
//         .then(quiz => {
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
//           quiz.remove().then(() => res.json({ success: true }));
//         })
//         .catch(err =>
//           res.status(404).json({ reportnotfound: "No question found" })
//         );
//     });
//   }
// );
//----------test

// // @route   DELETE api/quizzes/:id
// // @desc    Delete quiz
// // @access  Private
// router.delete(
//   "/:id",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     Profile.findOne({ user: req.user.id }).then(profile => {
//       req.params.id.forEach(idd =>
//         Quiz.findById(idd)
//           .then(quiz => {
//             // Check for question owner
//             //------------
//             console.log("User name is:", req.user);
//             //---------
//             if (
//               //question.user.toString() !== req.user.id &&
//               req.user.name.toLowerCase() !== "admin"
//             ) {
//               return res
//                 .status(401)
//                 .json({ notauthorized: "User not authorized" });
//             }

//             // Delete
//             quiz.remove().then(() => res.json({ success: true }));
//           })
//           .catch(err =>
//             res.status(404).json({ reportnotfound: "No question found" })
//           )
//       );
//     });
//   }
// );

module.exports = router;
