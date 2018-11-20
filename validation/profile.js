const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
  data.lastname = !isEmpty(data.lastname) ? data.lastname : "";

  if (!Validator.isLength(data.firstname, { min: 1, max: 40 })) {
    errors.firstname = "First name needs to between 1 and 40 characters";
  }

  if (Validator.isEmpty(data.firstname)) {
    errors.firstname = "Profile first name is required";
  }

  if (!Validator.isLength(data.lastname, { min: 1, max: 40 })) {
    errors.lastname = "Last name needs to between 1 and 40 characters";
  }

  if (Validator.isEmpty(data.lastname)) {
    errors.lastname = "Profile last name is required";
  }

  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = "Not a valid URL";
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = "Not a valid URL";
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = "Not a valid URL";
    }
  }

  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = "Not a valid URL";
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = "Not a valid URL";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
