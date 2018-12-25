const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const path = require("path");
const isEmpty = require("../../validation/is-empty");

// Result model
const Result = require("../../models/Result");
const ExamResult = require("../../models/ExamResult");
const Exam = require("../../models/Exam");

// Profile model
const Profile = require("../../models/Profile");

// Validation
const validateResultInput = require("../../validation/result");
const validateExamResultInput = require("../../validation/examresult");

// @route   GET api/results/test
// @desc    Tests results route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Results Works" }));

// @route   POST api/results
// @desc    Create results
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateResultInput(req.body);
    console.log("result req:", req.body);
    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      console.log("errors are:", errors);
      return res.status(400).json(errors);
    }

    const newQuestionAnswer = new Result({
      questionId: req.body.questionId,
      examId: req.body.examId,
      examRunId: req.body.examRunId,
      studentId: req.body.studentId,
      selectedAnswers: req.body.selectedAnswers,

      //--user means insteructor----
      user: req.user.id
    });
    console.log("newQuestionAnswer is:", newQuestionAnswer);
    newQuestionAnswer.save().then(result => res.json(result));
  }
);

// @route   POST api/results/examresults
// @desc    Create examresults
// @access  Private
router.post(
  "/examresult",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExamResultInput(req.body);
    console.log("examresult req:", req.body);
    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      console.log("errors are:", errors);
      return res.status(400).json(errors);
    }
    //------------find exam result
    Result.find({
      studentId: req.body.studentId,
      examId: req.body.examId,
      examRunId: req.body.examRunId
    })
      .sort({ date: -1 })
      .then(results => {
        //  res.json(results);

        console.log("Line 81-results are in api:", results);
        // console.log("Line 100-results are in api-json:", res.json(results));
        console.log("Line 83-req.user.id:", req.user.id);
        //----finding correct answers start--------
        Exam.findById(req.body.examId)
          .then(exam => {
            exam.qExam.sQuestions
              .forEach(
                que =>
                  //  {
                  //   if (
                  //     results.selectedAnswers.indexOf(
                  //       que.answers.answer01.ansText
                  //     ) !== -1 &&
                  //     que.answers.answer01.ansCorrect == true
                  //   ) {
                  //     console.log(
                  //       "answer01 is:",
                  //       que.answers.answer01.ansCorrect
                  //     );
                  //   } else {
                  //     console.log("Answer01 is Incorrect Answer");
                  //   }
                  // }
                  console.log("Line 87--exam.qExam.sQuestions", que.answers)
                //   results.selectedAnswers.indexOf(
                //     que.answers.answer01.ansText
                //   ) !== -1 && que.answers.answer01.ansCorrect == true
                //     ? console.log("answer01 is:", que.answers.answer01.ansCorrect)
                //     : console.log("Answer01 is Incorrect Answer")
              )
              .catch(err =>
                //  console.log("Line 100 error is:", err)
                res
                  .status(404)
                  .json({ noresultfound: "No result found for this user" })
              );
            // //----finding correct answers finish-------

            const newExamResult = new ExamResult({
              examId: req.body.examId,
              examRunId: req.body.examRunId,
              studentId: req.body.studentId,
              results: results,
              //--user means insteructor----
              user: req.user.id
            });
            console.log("newExamResult is:", newExamResult);
            newExamResult.save().then(examresult => res.json(examresult));
          })
          .catch(err =>
            res
              .status(404)
              .json({ noresultfound: "No result found for this user" })
          );
        //------------
      })
      .catch(err =>
        res.status(404).json({ noresultfound: "No result found for this user" })
      );
  }
);

module.exports = router;

// // @route   GET api/results
// // @desc    Get results by studentId and examId
// // @access  Private
// router.get(
//   "/",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     console.log("Result view works....!"),
//       Profile.findOne({ user: req.user.id }).then(profile => {
//         if (req.user.name.toLowerCase() !== "admin") {
//           // Result.find({
//           //   $or: [{ user: req.user.id }, { "sStudents.user._id": req.user.id }]
//           // })
//           Result.find({
//              studentId: req.body.studentId ,  examId: req.body.examId
//           })
//             .sort({ date: -1 })
//             .then(results => {
//               res.json(results);
//               console.log("Line 100-results are in api:", results);
//               console.log("req.user.id:", req.user.id);
//             })
//             .catch(err =>
//               res
//                 .status(404)
//                 .json({ noresultfound: "No result found for this user" })
//             );
//         } else {
//           Result.find()
//             .sort({ date: -1 })
//             .then(results => {
//               // Show exam
//               res.json(results);
//               // console.log("results are in api:", results);
//             })
//             .catch(err =>
//               res.status(404).json({ noresultsfound: "No result found" })
//             );
//         }
//       });
//   }
// );
// //--------------------

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
//           Exam.find({
//             $or: [{ user: req.user.id }, { "sStudents.user._id": req.user.id }]
//           })
//             .sort({ date: -1 })
//             .then(exams => {
//               res.json(exams);
//               console.log("Line 81-exams are in api:", exams);
//               console.log("req.user.id:", req.user.id);
//             })
//             .catch(err =>
//               res
//                 .status(404)
//                 .json({ noquestionfound: "No exam found for this user" })
//             );
//         } else {
//           Exam.find()
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

// // @route   GET api/exams/:id
// // @desc    Get exams by user id
// // @access  Private
// router.get(
//   "/:id",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     Profile.findOne({ user: req.user.id }).then(profile => {
//       Exam.findById(req.params.id)
//         .then(exam => {
//           // Check for exam owner
//           if (
//             exam.user.toString() !== req.user.id &&
//             req.user.name.toLowerCase() !== "admin" &&
//             exam.selectedStuId.indexOf(req.user.id) == -1
//           ) {
//             return res
//               .status(401)
//               .json({ notauthorized: "User not authorized" });
//           } else {
//             // Show exam
//             res.json(exam);
//           }
//         })
//         .catch(err =>
//           res.status(404).json({ noreportfound: "No exam found with that ID" })
//         );
//     });
//   }
// );

// // @route   DELETE api/exams/:id
// // @desc    Delete exam
// // @access  Private
// router.delete(
//   "/:id",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     Profile.findOne({ user: req.user.id }).then(profile => {
//       Exam.findById(req.params.id)
//         .then(exam => {
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
//           exam.remove().then(() => res.json({ success: true }));
//         })
//         .catch(err =>
//           res.status(404).json({ reportnotfound: "No question found" })
//         );
//     });
//   }
// );
// //----------test

// // // @route   DELETE api/quizzes/:id
// // // @desc    Delete quiz
// // // @access  Private
// // router.delete(
// //   "/:id",
// //   passport.authenticate("jwt", { session: false }),
// //   (req, res) => {
// //     Profile.findOne({ user: req.user.id }).then(profile => {
// //       req.params.id.forEach(idd =>
// //         Quiz.findById(idd)
// //           .then(quiz => {
// //             // Check for question owner
// //             //------------
// //             console.log("User name is:", req.user);
// //             //---------
// //             if (
// //               //question.user.toString() !== req.user.id &&
// //               req.user.name.toLowerCase() !== "admin"
// //             ) {
// //               return res
// //                 .status(401)
// //                 .json({ notauthorized: "User not authorized" });
// //             }

// //             // Delete
// //             quiz.remove().then(() => res.json({ success: true }));
// //           })
// //           .catch(err =>
// //             res.status(404).json({ reportnotfound: "No question found" })
// //           )
// //       );
// //     });
// //   }
// // )
