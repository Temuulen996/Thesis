class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this["StatusMessage"] = message;
  }
}
module.exports = CustomError;
///94351955
