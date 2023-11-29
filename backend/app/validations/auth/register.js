const Validator = require("validator");
const isEmpty = require("../is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.confirm_password = !isEmpty(data.confirm_password)
    ? data.confirm_password
    : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.message = "Name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.message = "Name field is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.message = "Email field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.message = "Email is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.message = "Password field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.message = "Password must be at least 6 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
