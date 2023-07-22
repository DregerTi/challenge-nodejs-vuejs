class ValidationError extends Error {
  constructor(errors) {
    super("Validation error");
    this.errors = errors;
  }

  static fromSequelizeValidationError(e) {
    const errors = e.errors.reduce((acc, error) => {
      if (!acc[error.path]) {
        acc[error.path] = [];
      }
      acc[error.path].push(error.message);
      return acc;
    }, {});
    return new ValidationError(errors);
  }

  static fromMongooseValidationError(e) {
    let errors = {};

    Object.keys(e.errors).forEach((key) => {
      errors[key] = e.errors[key].message;
    });
    return new ValidationError(errors);
  }
}

module.exports = ValidationError;
