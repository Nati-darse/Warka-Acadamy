import Joi from 'joi';

// Common validation patterns
const emailPattern = Joi.string()
  .email({ tlds: { allow: false } })
  .lowercase()
  .trim()
  .required()
  .messages({
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required'
  });

const passwordPattern = Joi.string()
  .min(6)
  .max(128)
  .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)'))
  .required()
  .messages({
    'string.min': 'Password must be at least 6 characters long',
    'string.max': 'Password cannot exceed 128 characters',
    'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, and one number',
    'any.required': 'Password is required'
  });

const namePattern = Joi.string()
  .trim()
  .min(1)
  .max(50)
  .pattern(new RegExp('^[a-zA-Z\\s]+$'))
  .messages({
    'string.min': 'Name must be at least 1 character long',
    'string.max': 'Name cannot exceed 50 characters',
    'string.pattern.base': 'Name can only contain letters and spaces'
  });

const phonePattern = Joi.string()
  .trim()
  .pattern(new RegExp('^\\+?[\\d\\s\\-\\(\\)]+$'))
  .messages({
    'string.pattern.base': 'Please provide a valid phone number'
  });

// Address schema
const addressSchema = Joi.object({
  street: Joi.string().trim().max(100),
  city: Joi.string().trim().max(50),
  state: Joi.string().trim().max(50),
  zipCode: Joi.string().trim().max(20),
  country: Joi.string().trim().max(50)
});

/**
 * User registration validation schema
 */
export const registerSchema = Joi.object({
  email: emailPattern,
  password: passwordPattern,
  role: Joi.string()
    .valid('student', 'parent', 'teacher', 'admin', 'staff')
    .required()
    .messages({
      'any.only': 'Role must be one of: student, parent, teacher, admin, staff',
      'any.required': 'Role is required'
    }),
  firstName: namePattern.required().messages({
    'any.required': 'First name is required'
  }),
  lastName: namePattern.required().messages({
    'any.required': 'Last name is required'
  }),
  middleName: namePattern.optional(),
  dateOfBirth: Joi.date()
    .max('now')
    .optional()
    .messages({
      'date.max': 'Date of birth must be in the past'
    }),
  gender: Joi.string()
    .valid('male', 'female', 'other')
    .optional()
    .messages({
      'any.only': 'Gender must be one of: male, female, other'
    }),
  phone: phonePattern.optional(),
  address: addressSchema.optional()
});

/**
 * User login validation schema
 */
export const loginSchema = Joi.object({
  email: emailPattern,
  password: Joi.string()
    .required()
    .messages({
      'any.required': 'Password is required'
    }),
  rememberMe: Joi.boolean().optional().default(false)
});

/**
 * Refresh token validation schema
 */
export const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string()
    .required()
    .messages({
      'any.required': 'Refresh token is required'
    })
});

/**
 * Forgot password validation schema
 */
export const forgotPasswordSchema = Joi.object({
  email: emailPattern
});

/**
 * Reset password validation schema
 */
export const resetPasswordSchema = Joi.object({
  password: passwordPattern,
  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({
      'any.only': 'Passwords do not match',
      'any.required': 'Password confirmation is required'
    })
});

/**
 * Change password validation schema
 */
export const changePasswordSchema = Joi.object({
  currentPassword: Joi.string()
    .required()
    .messages({
      'any.required': 'Current password is required'
    }),
  newPassword: passwordPattern,
  confirmPassword: Joi.string()
    .valid(Joi.ref('newPassword'))
    .required()
    .messages({
      'any.only': 'Passwords do not match',
      'any.required': 'Password confirmation is required'
    })
});

/**
 * Update profile validation schema
 */
export const updateProfileSchema = Joi.object({
  firstName: namePattern.optional(),
  lastName: namePattern.optional(),
  middleName: namePattern.optional(),
  dateOfBirth: Joi.date()
    .max('now')
    .optional()
    .messages({
      'date.max': 'Date of birth must be in the past'
    }),
  gender: Joi.string()
    .valid('male', 'female', 'other')
    .optional()
    .messages({
      'any.only': 'Gender must be one of: male, female, other'
    }),
  phone: phonePattern.optional(),
  address: addressSchema.optional()
});

/**
 * Common ID validation schema
 */
export const idSchema = Joi.object({
  id: Joi.string()
    .pattern(new RegExp('^[0-9a-fA-F]{24}$'))
    .required()
    .messages({
      'string.pattern.base': 'Invalid ID format',
      'any.required': 'ID is required'
    })
});

/**
 * Pagination validation schema
 */
export const paginationSchema = Joi.object({
  page: Joi.number()
    .integer()
    .min(1)
    .default(1)
    .messages({
      'number.min': 'Page must be at least 1'
    }),
  limit: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .default(10)
    .messages({
      'number.min': 'Limit must be at least 1',
      'number.max': 'Limit cannot exceed 100'
    }),
  search: Joi.string()
    .trim()
    .max(100)
    .optional()
    .messages({
      'string.max': 'Search term cannot exceed 100 characters'
    }),
  sortBy: Joi.string()
    .trim()
    .optional(),
  sortOrder: Joi.string()
    .valid('asc', 'desc')
    .default('desc')
    .messages({
      'any.only': 'Sort order must be either "asc" or "desc"'
    })
});

export default {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
  updateProfileSchema,
  idSchema,
  paginationSchema
};
