const errorHandler = (err, req, res, next) => {
  console.log(err);
  const error = { ...err };

  res.status(error.statusCode || 500).json({
    success: false,
    error,
    code: error.statusCode,
  });
};
module.exports = errorHandler;
