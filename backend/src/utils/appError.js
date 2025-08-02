/**
 * Custom Application Error Class
 * Extends the built-in Error class to provide consistent error handling
 */
export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Validation Error Class
 * For handling validation errors with field-specific messages
 */
export class ValidationError extends AppError {
  constructor(errors) {
    const message = 'Validation failed';
    super(message, 422);
    
    this.errors = errors;
    this.name = 'ValidationError';
  }
}

/**
 * Authentication Error Class
 */
export class AuthenticationError extends AppError {
  constructor(message = 'Authentication failed') {
    super(message, 401);
    this.name = 'AuthenticationError';
  }
}

/**
 * Authorization Error Class
 */
export class AuthorizationError extends AppError {
  constructor(message = 'Access denied') {
    super(message, 403);
    this.name = 'AuthorizationError';
  }
}

/**
 * Not Found Error Class
 */
export class NotFoundError extends AppError {
  constructor(resource = 'Resource') {
    super(`${resource} not found`, 404);
    this.name = 'NotFoundError';
  }
}

/**
 * Conflict Error Class
 */
export class ConflictError extends AppError {
  constructor(message = 'Resource already exists') {
    super(message, 409);
    this.name = 'ConflictError';
  }
}

/**
 * Rate Limit Error Class
 */
export class RateLimitError extends AppError {
  constructor(message = 'Too many requests') {
    super(message, 429);
    this.name = 'RateLimitError';
  }
}

/**
 * Database Error Class
 */
export class DatabaseError extends AppError {
  constructor(message = 'Database operation failed') {
    super(message, 500);
    this.name = 'DatabaseError';
  }
}

/**
 * External Service Error Class
 */
export class ExternalServiceError extends AppError {
  constructor(service, message = 'External service unavailable') {
    super(`${service}: ${message}`, 503);
    this.name = 'ExternalServiceError';
    this.service = service;
  }
}

export default AppError;
