const { body, validationResult } = require("express-validator");

const userValidationRules = () => {
  return [
    body("name")
      .isLength({ min: 4 })
      .withMessage("Name must be at least 4 characters long"),
    body("email").isEmail().withMessage("Please Enter Proper Email ID"),
    body("age")
      .isInt({ min: 18, max: 65 })
      .withMessage("Age must be between 18 and 65"),
    body("gender").isString().withMessage("Please Enter Correct Gender"),
    body("batch").isString().withMessage("Please Enter Correct Batch"),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  userValidationRules,
  validate,
};
