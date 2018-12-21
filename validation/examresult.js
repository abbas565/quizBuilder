const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExamResultInput(data) {
  let errors = {};

  data.examId = !isEmpty(data.examId) ? data.examId : "";
  data.studentId = !isEmpty(data.studentId) ? data.studentId : "";

  if (Validator.isEmpty(data.examId)) {
    errors.examId = "Exam ID is required";
  }

  if (Validator.isEmpty(data.studentId)) {
    errors.studentId = "Student ID is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
