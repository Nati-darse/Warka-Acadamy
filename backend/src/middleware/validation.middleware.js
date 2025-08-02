import { ValidationError } from '../utils/appError.js';

/**
 * Validation middleware factory
 * @param {Object} schema - Joi validation schema
 * @param {string} property - Request property to validate ('body', 'params', 'query')
 */
export const validateRequest = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false, // Return all validation errors
      stripUnknown: true, // Remove unknown fields
      convert: true // Convert values to correct types
    });

    if (error) {
      const errors = {};
      error.details.forEach(detail => {
        const key = detail.path.join('.');
        errors[key] = detail.message;
      });
      
      return next(new ValidationError(errors));
    }

    // Replace the original data with validated and sanitized data
    req[property] = value;
    next();
  };
};

/**
 * Validate request body
 */
export const validateBody = (schema) => validateRequest(schema, 'body');

/**
 * Validate request params
 */
export const validateParams = (schema) => validateRequest(schema, 'params');

/**
 * Validate request query
 */
export const validateQuery = (schema) => validateRequest(schema, 'query');

export default validateRequest;
