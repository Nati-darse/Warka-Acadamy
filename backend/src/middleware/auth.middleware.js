import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { AppError } from '../utils/appError.js';
import { catchAsync } from '../utils/catchAsync.js';

// JWT Secret keys (should be in environment variables)
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-super-secret-refresh-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '15m';
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

// Generate JWT tokens
export const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  });
  
  const refreshToken = jwt.sign({ userId }, JWT_REFRESH_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRES_IN
  });
  
  return { accessToken, refreshToken };
};

// Verify JWT token
export const verifyToken = (token, secret = JWT_SECRET) => {
  return jwt.verify(token, secret);
};

// Get token expiration date
export const getTokenExpiration = (expiresIn) => {
  const now = new Date();
  const expiration = new Date(now.getTime());
  
  if (expiresIn.endsWith('m')) {
    expiration.setMinutes(now.getMinutes() + parseInt(expiresIn));
  } else if (expiresIn.endsWith('h')) {
    expiration.setHours(now.getHours() + parseInt(expiresIn));
  } else if (expiresIn.endsWith('d')) {
    expiration.setDate(now.getDate() + parseInt(expiresIn));
  }
  
  return expiration;
};

// Authentication middleware
export const authenticate = catchAsync(async (req, res, next) => {
  // 1) Get token from header
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  
  if (!token) {
    return next(new AppError('You are not logged in! Please log in to get access.', 401));
  }
  
  // 2) Verify token
  let decoded;
  try {
    decoded = verifyToken(token);
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return next(new AppError('Invalid token. Please log in again!', 401));
    } else if (error.name === 'TokenExpiredError') {
      return next(new AppError('Your token has expired! Please log in again.', 401));
    }
    return next(new AppError('Token verification failed', 401));
  }
  
  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.userId).select('+loginAttempts +lockUntil');
  if (!currentUser) {
    return next(new AppError('The user belonging to this token does no longer exist.', 401));
  }
  
  // 4) Check if user account is active
  if (!currentUser.isActive) {
    return next(new AppError('Your account has been deactivated. Please contact administrator.', 401));
  }
  
  // 5) Check if user account is locked
  if (currentUser.isLocked) {
    return next(new AppError('Your account is temporarily locked due to too many failed login attempts. Please try again later.', 423));
  }
  
  // Grant access to protected route
  req.user = currentUser;
  next();
});

// Authorization middleware - restrict to specific roles
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError('You must be authenticated to access this resource', 401));
    }
    
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }
    
    next();
  };
};

// Resource-based authorization middleware
export const authorizeResource = (resourceField = 'userId') => {
  return catchAsync(async (req, res, next) => {
    if (!req.user) {
      return next(new AppError('You must be authenticated to access this resource', 401));
    }
    
    // Admin can access all resources
    if (req.user.role === 'admin') {
      return next();
    }
    
    // Get resource ID from params or body
    const resourceId = req.params.id || req.body.id;
    if (!resourceId) {
      return next(new AppError('Resource ID is required', 400));
    }
    
    // For students, they can only access their own resources
    if (req.user.role === 'student') {
      const Student = (await import('../models/student.model.js')).default;
      const student = await Student.findOne({ userId: req.user._id });
      
      if (!student || student._id.toString() !== resourceId) {
        return next(new AppError('You can only access your own resources', 403));
      }
    }
    
    // For parents, they can only access their children's resources
    if (req.user.role === 'parent') {
      const Parent = (await import('../models/parent.model.js')).default;
      const parent = await Parent.findOne({ userId: req.user._id }).populate('students');
      
      if (!parent) {
        return next(new AppError('Parent profile not found', 404));
      }
      
      const hasAccess = parent.students.some(student => 
        student._id.toString() === resourceId
      );
      
      if (!hasAccess) {
        return next(new AppError('You can only access your children\'s resources', 403));
      }
    }
    
    // For teachers, they can access resources of students in their classes
    if (req.user.role === 'teacher') {
      const Teacher = (await import('../models/teacher.model.js')).default;
      const teacher = await Teacher.findOne({ userId: req.user._id }).populate('classes');
      
      if (!teacher) {
        return next(new AppError('Teacher profile not found', 404));
      }
      
      // Check if the resource belongs to a student in teacher's classes
      const Student = (await import('../models/student.model.js')).default;
      const student = await Student.findById(resourceId);
      
      if (!student) {
        return next(new AppError('Student not found', 404));
      }
      
      const hasAccess = teacher.classes.some(classObj => 
        student.currentClass && student.currentClass.toString() === classObj._id.toString()
      );
      
      if (!hasAccess) {
        return next(new AppError('You can only access resources of students in your classes', 403));
      }
    }
    
    next();
  });
};

// Optional authentication middleware (for public routes that can benefit from user context)
export const optionalAuth = catchAsync(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  
  if (token) {
    try {
      const decoded = verifyToken(token);
      const currentUser = await User.findById(decoded.userId);
      
      if (currentUser && currentUser.isActive && !currentUser.isLocked) {
        req.user = currentUser;
      }
    } catch (error) {
      // Ignore token errors for optional auth
    }
  }
  
  next();
});

// Middleware to check if user owns the resource or has admin privileges
export const ownerOrAdmin = catchAsync(async (req, res, next) => {
  if (!req.user) {
    return next(new AppError('You must be authenticated to access this resource', 401));
  }
  
  // Admin can access everything
  if (req.user.role === 'admin') {
    return next();
  }
  
  // Check if user owns the resource
  const resourceUserId = req.params.userId || req.body.userId;
  if (req.user._id.toString() === resourceUserId) {
    return next();
  }
  
  return next(new AppError('You can only access your own resources', 403));
});

// Middleware to validate refresh token
export const validateRefreshToken = catchAsync(async (req, res, next) => {
  const { refreshToken } = req.body;
  
  if (!refreshToken) {
    return next(new AppError('Refresh token is required', 400));
  }
  
  let decoded;
  try {
    decoded = verifyToken(refreshToken, JWT_REFRESH_SECRET);
  } catch (error) {
    return next(new AppError('Invalid refresh token', 401));
  }
  
  const user = await User.findById(decoded.userId);
  if (!user) {
    return next(new AppError('User not found', 404));
  }
  
  // Check if refresh token exists in user's refresh tokens
  const tokenExists = user.refreshTokens.some(rt => 
    rt.token === refreshToken && rt.expiresAt > new Date()
  );
  
  if (!tokenExists) {
    return next(new AppError('Invalid or expired refresh token', 401));
  }
  
  req.user = user;
  req.refreshToken = refreshToken;
  next();
});

export { JWT_SECRET, JWT_REFRESH_SECRET, JWT_EXPIRES_IN, JWT_REFRESH_EXPIRES_IN };
