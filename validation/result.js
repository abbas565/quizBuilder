const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateResultInput(data) {
  let errors = {};

  data.questionId = !isEmpty(data.questionId) ? data.questionId : "";
  data.examId = !isEmpty(data.examId) ? data.examId : "";
  data.studentId = !isEmpty(data.studentId) ? data.studentId : "";
  // data.selectedAnswers = !isEmpty(data.selectedAnswers)
  //   ? data.selectedAnswers
  //   : "";

  if (Validator.isEmpty(data.questionId)) {
    errors.questionId = "Question ID is required";
  }

  if (Validator.isEmpty(data.examId)) {
    errors.examId = "Exam ID is required";
  }

  if (Validator.isEmpty(data.studentId)) {
    errors.studentId = "Student ID is required";
  }

  // if (Validator.isEmpty(data.selectedAnswers)) {
  //   errors.selectedAnswers = "Selected answers are required";
  // }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
