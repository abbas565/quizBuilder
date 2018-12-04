const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateQuizInput(data) {
  let errors = {};

  data.quizName = !isEmpty(data.quizName) ? data.quizName : "";
  //   data.selectedQueId = !isEmpty(data.selectedQueId) ? data.selectedQueId : "";
  //   data.sQuestions = !isEmpty(data.sQuestions) ? data.sQuestions : "";
  //   data.quizOwner = !isEmpty(data.quizOwner) ? data.quizOwner : "";
  //   data.avatar = !isEmpty(data.avatar) ? data.avatar : "";

  if (Validator.isEmpty(data.quizName)) {
    errors.quizName = "Quiz name is required";
  }

  //   if (Validator.isEmpty(data.selectedQueId)) {
  //     errors.selectedQueId = "Selected question IDs(selectedQueId) are required";
  //   }

  //   if (Validator.isEmpty(data.sQuestions)) {
  //     errors.sQuestions = "Selected questions are required";
  //   }

  //   if (Validator.isEmpty(data.quizOwner)) {
  //     errors.quizOwner = "Quiz owner's name(Instructor) is required";
  //   }

  //   if (Validator.isEmpty(data.avatar)) {
  //     errors.avatar = "Avatar is required";
  //   }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
