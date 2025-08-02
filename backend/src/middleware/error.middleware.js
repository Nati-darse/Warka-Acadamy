import { AppError, ValidationError } from '../utils/appError.js';

/**
 * Handle MongoDB Cast Errors (Invalid ObjectId)
 */
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

/**
 * Handle MongoDB Duplicate Key Errors
 */
const handleDuplicateFieldsDB = (err) => {
  const field = Object.keys(err.keyValue)[0];
  const value = err.keyValue[field];
  const message = `${field.charAt(0).toUpperCase() + field.slice(1)} '${value}' already exists`;
  return new AppError(message, 409);
};

/**
 * Handle MongoDB Validation Errors
 */
const handleValidationErrorDB = (err) => {
  const errors = {};
  Object.values(err.errors).forEach(error => {
    errors[error.path] = error.message;
  });
  return new ValidationError(errors);
};

/**
 * Handle JWT Errors
 */
const handleJWTError = () => {
  return new AppError('Invalid token. Please log in again!', 401);
};

/**
 * Handle JWT Expired Errors
 */
const handleJWTExpiredError = () => {
  return new AppError('Your token has expired! Please log in again.', 401);
};

/**
 * Send error response in development
 */
const sendErrorDev = (err, req, res) => {
  // API Error
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      success: false,
      error: err,
      message: err.message,
      stack: err.stack,
      timestamp: new Date().toISOString()
    });
  }

  // Rendered website error (if you have server-side rendering)
  console.error('ERROR 💥', err);
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: err.message
  });
};

/**
 * Send error response in production
 */
const sendErrorProd = (err, req, res) => {
  // API Error
  if (req.originalUrl.startsWith('/api')) {
    // Operational, trusted error: send message to client
    if (err.isOperational) {
      const response = {
        success: false,
        message: err.message,
        timestamp: new Date().toISOString()
      };

      // Include validation errors if present
      if (err instanceof ValidationError) {
        response.errors = err.errors;
      }

      return res.status(err.statusCode).json(response);
    }

    // Programming or other unknown error: don't leak error details
    console.error('ERROR 💥', err);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      timestamp: new Date().toISOString()
    });
  }

  // Rendered website error
  if (err.isOperational) {
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong!',
      msg: err.message
    });
  }

  // Programming or other unknown error: don't leak error details
  console.error('ERROR 💥', err);
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: 'Please try again later.'
  });
};

/**
 * Global Error Handling Middleware
 */
export const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else {
    let error = { ...err };
    error.message = err.message;

    // Handle specific error types
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, req, res);
  }
};

/**
 * Handle unhandled routes
 */
export const handleNotFound = (req, res, next) => {
  const err = new AppError(`Can't find ${req.originalUrl} on this server!`, 404);
  next(err);
};

/**
 * Async error wrapper for route handlers
 */
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export { globalErrorHandler as default };
