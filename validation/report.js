const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateReportInput(data) {
  let errors = {};

  data.fedDate = !isEmpty(data.fedDate) ? data.fedDate : "";
  data.foodType = !isEmpty(data.foodType) ? data.foodType : "";
  data.where = !isEmpty(data.where) ? data.where : "";
  data.howManyDucks = !isEmpty(data.howManyDucks) ? data.howManyDucks : "";
  data.foodKind = !isEmpty(data.foodKind) ? data.foodKind : "";
  data.howMuchFood = !isEmpty(data.howMuchFood) ? data.howMuchFood : "";

  if (Validator.isEmpty(data.fedDate)) {
    errors.fedDate = "Date of fed is required";
  }

  if (!Validator.isLength(data.foodType, { min: 1, max: 40 })) {
    errors.foodType = "Food type must be between 1 and 40 characters";
  }

  if (Validator.isEmpty(data.foodType)) {
    errors.foodType = "Food type field is required";
  }

  if (!Validator.isLength(data.where, { min: 1, max: 40 })) {
    errors.where = "Location must be between 1 and 40 characters";
  }

  if (Validator.isEmpty(data.where)) {
    errors.where = "Location field is required";
  }

  if (!Validator.isNumeric(data.howManyDucks, { no_symbols: true })) {
    errors.howManyDucks = "Number of ducks must be a number";
  }

  if (Validator.isEmpty(data.howManyDucks)) {
    errors.howManyDucks = "Number of ducks field is required";
  }

  if (!Validator.isLength(data.foodKind, { min: 1, max: 40 })) {
    errors.foodKind = "Kind of food must be between 1 and 40 characters";
  }

  if (Validator.isEmpty(data.foodKind)) {
    errors.foodKind = "Kind of food field is required";
  }

  if (!Validator.isNumeric(data.howMuchFood, { no_symbols: true })) {
    errors.howMuchFood =
      "Amount of food must be an positive integer number(Gr)";
  }

  if (Validator.isEmpty(data.howMuchFood)) {
    errors.howMuchFood = "Amount of food field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
