const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateQuestionInput(data) {
  let errors = {};

  data.mainText = !isEmpty(data.mainText) ? data.mainText : "";
  data.referenceBook = !isEmpty(data.referenceBook) ? data.referenceBook : "";
  data.courseId = !isEmpty(data.courseId) ? data.courseId : "";
  data.courseLevel = !isEmpty(data.courseLevel) ? data.courseLevel : "";

  if (Validator.isEmpty(data.mainText)) {
    errors.mainText = "Question text is required";
  }
  if (Validator.isEmpty(data.referenceBook)) {
    errors.referenceBook = "Reference Book field is required";
  }
  if (Validator.isEmpty(data.courseId)) {
    errors.courseId = "Course ID is required";
  }
  if (Validator.isEmpty(data.courseLevel)) {
    errors.courseLevel = "Course Level is required";
  }

  data.questionType = !isEmpty(data.questionType) ? data.questionType : 0;
  console.log("Line 26-Question type is:", data.questionType != 3);
  console.log("Line 27-Question type is:", data.questionType);

  if (Validator.equals(data.questionType, 0)) {
    errors.questionType = "Question type is required";
    console.log("Question type is:", data.questionType != 3);
  } else if (data.questionType != 3) {
    data.answerText01 = !isEmpty(data.answerText01) ? data.answerText01 : "";
    data.answerText02 = !isEmpty(data.answerText02) ? data.answerText02 : "";
    data.answerText03 = !isEmpty(data.answerText03) ? data.answerText03 : "";
    data.answerText04 = !isEmpty(data.answerText04) ? data.answerText04 : "";
    data.answerCorrect01 = !isEmpty(data.answerCorrect01)
      ? data.answerCorrect01
      : false;
    data.answerCorrect02 = !isEmpty(data.answerCorrect02)
      ? data.answerCorrect02
      : false;
    data.answerCorrect03 = !isEmpty(data.answerCorrect03)
      ? data.answerCorrect03
      : false;
    data.answerCorrect04 = !isEmpty(data.answerCorrect04)
      ? data.answerCorrect04
      : false;

    if (Validator.isEmpty(data.answerText01)) {
      errors.answerText01 = "Answer one field is required";
    } else if (Validator.isEmpty(data.answerCorrect01)) {
      errors.answerCorrect01 = "What is status of this answer? True or False?";
    }
    if (Validator.isEmpty(data.answerText02)) {
      errors.answerText02 = "Answer two field is required";
    } else if (Validator.isEmpty(data.answerCorrect02)) {
      errors.answerCorrect02 = "What is status of this answer? True or False?";
    }
    if (Validator.isEmpty(data.answerText03)) {
      errors.answerText03 = "Answer three field is required";
    } else if (Validator.isEmpty(data.answerCorrect03)) {
      errors.answerCorrect03 = "What is status of this answer? True or False?";
    }
    if (Validator.isEmpty(data.answerText04)) {
      errors.answerText04 = "Answer four field is required";
    } else if (Validator.isEmpty(data.answerCorrect04)) {
      errors.answerCorrect04 = "What is status of this answer? True or False?";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
