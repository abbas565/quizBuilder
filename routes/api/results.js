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
      answerDescript: req.body.answerDescript,

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
      // .sort({ date: -1 })
      .sort({ questionId: -1 })
      .then(results => {
        //-----remove old saved answerd in each exam start-------
        // console.log("Line 82-results.length is:", results);
        const removeitems = [];
        for (let i = 0; i < results.length - 1; i++) {
          // console.log("questionId is:", results[i].questionId);
          if (results[i].questionId == results[i + 1].questionId) {
            if (results[i].date > results[i + 1].date) {
              removeitems.push(results[i + 1]);
            } else {
              removeitems.push(results[i]);
            }
          }
        }

        const newresults = results.filter(
          item => removeitems.indexOf(item) == -1
        );
        console.log("Line 97-newresults is:", newresults);

        //  res.json(results);

        // console.log("Line 119-results are in api:", results);
        // console.log("Line 120-req.user.id:", req.user.id);

        //----finding correct answers start--------
        Exam.findById(req.body.examId)
          .then(exam => {
            // console.log(
            //   "Line 108-exam.qExam.sQuestions is:",
            //   exam.qExam.sQuestions
            // );
            exam.qExam.sQuestions.forEach(que => {
              newresults.forEach(result => {
                if (que._id == result.questionId) {
                  //-------Points pass algorithem start ---
                  // if answer is correct pass is 1
                  // if answer is incorrect pass is -1
                  // if answer didn't selected correct pass is 0
                  //-------Points pass algorithem finished ---

                  //-----choose answer01------
                  if (
                    result.selectedAnswers.indexOf(
                      que.answers.answer01.ansText
                    ) !== -1
                  ) {
                    if (que.answers.answer01.ansCorrect == true) {
                      console.log(
                        "You chose answer01 and it is CORRECT:",
                        que.answers.answer01.ansCorrect
                      );
                      result.answerSelectPass.answer01pass = 1;
                    } else {
                      console.log("You chose answer01 and it is INCORRECT:");
                      result.answerSelectPass.answer01pass = -1;
                    }
                  } else {
                    console.log("You didn't choose answer01");
                    result.answerSelectPass.answer01pass = 0;
                  }
                  //-----choose answer02------
                  if (
                    result.selectedAnswers.indexOf(
                      que.answers.answer02.ansText
                    ) !== -1
                  ) {
                    if (que.answers.answer02.ansCorrect == true) {
                      console.log(
                        "You chose answer02 and it is CORRECT:",
                        que.answers.answer02.ansCorrect
                      );
                      result.answerSelectPass.answer02pass = 1;
                    } else {
                      console.log("You chose answer02 and it is INCORRECT:");
                      result.answerSelectPass.answer02pass = -1;
                    }
                  } else {
                    console.log("You didn't choose answer02");
                    result.answerSelectPass.answer02pass = 0;
                  }
                  //-----choose answer03------
                  if (
                    result.selectedAnswers.indexOf(
                      que.answers.answer03.ansText
                    ) !== -1
                  ) {
                    if (que.answers.answer03.ansCorrect == true) {
                      console.log(
                        "You chose answer03 and it is CORRECT:",
                        que.answers.answer03.ansCorrect
                      );
                      result.answerSelectPass.answer03pass = 1;
                    } else {
                      console.log("You chose answer03 and it is INCORRECT:");
                      result.answerSelectPass.answer03pass = -1;
                    }
                  } else {
                    console.log("You didn't choose answer03");
                    result.answerSelectPass.answer03pass = 0;
                  }
                  //-----choose answer04------
                  if (
                    result.selectedAnswers.indexOf(
                      que.answers.answer04.ansText
                    ) !== -1
                  ) {
                    if (que.answers.answer04.ansCorrect == true) {
                      console.log(
                        "You chose answer04 and it is CORRECT:",
                        que.answers.answer04.ansCorrect
                      );
                      result.answerSelectPass.answer04pass = 1;
                    } else {
                      console.log("You chose answer04 and it is INCORRECT:");
                      result.answerSelectPass.answer04pass = -1;
                    }
                  } else {
                    console.log("You didn't choose answer04");
                    result.answerSelectPass.answer04pass = 0;
                  }
                  console.log(
                    "result.answerSelectPass is:",
                    result.answerSelectPass
                  );
                }
              });
              //-----------control clg start -----------
              console.log(
                "Line 106--exam.qExam.sQuestions.answers.answer01:",
                que.answers.answer01
              ),
                console.log(
                  "Line 110--exam.qExam.sQuestions.answers.answer02:",
                  que.answers.answer02
                ),
                console.log(
                  "Line 115--exam.qExam.sQuestions.answers.answer03",
                  que.answers.answer03
                ),
                console.log(
                  "Line 118--exam.qExam.sQuestions.answers.answer04",
                  que.answers.answer04
                );
              //-----------control clg finish -----------
            });

            //----finding correct answers finish-------

            const newExamResult = new ExamResult({
              examId: req.body.examId,
              examRunId: req.body.examRunId,
              studentId: req.body.studentId,
              results: newresults,
              //--user means insteructor----
              user: req.user.id
            });
            console.log("newExamResult is:", newExamResult);
            newExamResult.save().then(examresult => res.json(examresult));
            // console.log("Line 239-examresult is:", examresult);
          })
          .catch(err =>
            res.status(404).json({ noexamfound: "No exam found for this user" })
          );
        //------------
      })
      .catch(err =>
        res.status(404).json({ noresultfound: "No result found for this user" })
      );
  }
);

// @route   GET api/results/:id
// @desc    Get examresult by examRunId
// @access  Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      ExamResult.find({ examId: req.params.id })
        .then(examresult => {
          // Check for exam owner
          // if (
          //   examresult.user.toString() !== req.user.id &&
          //   req.user.name.toLowerCase() !== "admin" &&
          //   examresult.studentId !== req.user.id
          // ) {
          //   return res
          //     .status(401)
          //     .json({ notauthorized: "User not authorized" });
          // } else {
          //   // Show examresult
          //   res.json(examresult);
          // }
          res.json(examresult);
        })
        .catch(err =>
          res.status(404).json({
            noexamresultfound: "No examresult found with that examRunId"
          })
        );
    });
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
