const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Mongo duplicate key error
  if (err.code === 11000) {
    err.statusCode = 400;
    err.message = "Duplicate field value entered";
  }

  res.status(err.statusCode).json({
    success: false,
    status: err.status,
    message: err.message,
  });
};

export default errorMiddleware;
