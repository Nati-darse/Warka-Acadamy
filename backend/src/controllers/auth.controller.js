import crypto from 'crypto';
import User from '../models/user.model.js';
import { AppError, AuthenticationError, ValidationError } from '../utils/appError.js';
import { catchAsync } from '../utils/catchAsync.js';
import { 
  generateTokens, 
  getTokenExpiration, 
  JWT_EXPIRES_IN, 
  JWT_REFRESH_EXPIRES_IN 
} from '../middleware/auth.middleware.js';
import { sendEmail } from '../utils/email.js';

/**
 * Register a new user
 */
export const register = catchAsync(async (req, res, next) => {
  const {
    email,
    password,
    role,
    firstName,
    lastName,
    middleName,
    dateOfBirth,
    gender,
    phone,
    address
  } = req.body;

  // Check if user already exists
  const existingUser = await User.findByEmail(email);
  if (existingUser) {
    return next(new AppError('User with this email already exists', 409));
  }

  // Create new user
  const userData = {
    email,
    password,
    role,
    firstName,
    lastName,
    middleName,
    dateOfBirth,
    gender,
    phone,
    address,
    createdBy: req.user?._id // If created by admin
  };

  const user = await User.create(userData);

  // Generate email verification token
  const verificationToken = crypto.randomBytes(32).toString('hex');
  user.emailVerificationToken = crypto
    .createHash('sha256')
    .update(verificationToken)
    .digest('hex');
  user.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

  await user.save({ validateBeforeSave: false });

  // Send verification email (implement email service)
  try {
    const verificationURL = `${req.protocol}://${req.get('host')}/api/auth/verify-email/${verificationToken}`;
    
    await sendEmail({
      email: user.email,
      subject: 'Email Verification - School Management System',
      template: 'emailVerification',
      data: {
        name: user.fullName,
        verificationURL
      }
    });
  } catch (error) {
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save({ validateBeforeSave: false });
    
    return next(new AppError('There was an error sending the verification email. Please try again later.', 500));
  }

  res.status(201).json({
    success: true,
    message: 'User registered successfully. Please check your email to verify your account.',
    data: {
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        isEmailVerified: user.isEmailVerified
      }
    }
  });
});

/**
 * Login user
 */
export const login = catchAsync(async (req, res, next) => {
  const { email, password, rememberMe = false } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new ValidationError({
      email: !email ? 'Email is required' : undefined,
      password: !password ? 'Password is required' : undefined
    }));
  }

  // 2) Check if user exists and password is correct
  const user = await User.findByEmail(email).select('+password +loginAttempts +lockUntil');
  
  if (!user) {
    return next(new AuthenticationError('Invalid email or password'));
  }

  // 3) Check if account is locked
  if (user.isLocked) {
    return next(new AppError('Account is temporarily locked due to too many failed login attempts. Please try again later.', 423));
  }

  // 4) Check if account is active
  if (!user.isActive) {
    return next(new AppError('Your account has been deactivated. Please contact administrator.', 401));
  }

  // 5) Check password
  const isPasswordCorrect = await user.comparePassword(password);
  
  if (!isPasswordCorrect) {
    await user.incLoginAttempts();
    return next(new AuthenticationError('Invalid email or password'));
  }

  // 6) Reset login attempts on successful login
  if (user.loginAttempts > 0) {
    await user.resetLoginAttempts();
  }

  // 7) Generate tokens
  const { accessToken, refreshToken } = generateTokens(user._id);
  
  // 8) Store refresh token
  const refreshTokenExpiry = getTokenExpiration(JWT_REFRESH_EXPIRES_IN);
  const deviceInfo = {
    userAgent: req.get('User-Agent'),
    ip: req.ip
  };
  
  await user.addRefreshToken(refreshToken, refreshTokenExpiry, deviceInfo);

  // 9) Update last login
  user.lastLogin = new Date();
  await user.save({ validateBeforeSave: false });

  // 10) Set secure cookie for refresh token if remember me is checked
  if (rememberMe) {
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
  }

  res.status(200).json({
    success: true,
    message: 'Login successful',
    data: {
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: user.fullName,
        profilePicture: user.profilePicture,
        isEmailVerified: user.isEmailVerified,
        lastLogin: user.lastLogin
      },
      tokens: {
        accessToken,
        refreshToken: rememberMe ? undefined : refreshToken, // Don't send in response if stored in cookie
        expiresIn: JWT_EXPIRES_IN
      }
    }
  });
});

/**
 * Refresh access token
 */
export const refreshToken = catchAsync(async (req, res, next) => {
  const { refreshToken: tokenFromBody } = req.body;
  const tokenFromCookie = req.cookies?.refreshToken;
  
  const refreshToken = tokenFromBody || tokenFromCookie;
  
  if (!refreshToken) {
    return next(new AppError('Refresh token is required', 400));
  }

  // The validateRefreshToken middleware has already validated the token and set req.user
  const user = req.user;
  const oldRefreshToken = req.refreshToken;

  // Generate new tokens
  const { accessToken, refreshToken: newRefreshToken } = generateTokens(user._id);
  
  // Replace old refresh token with new one
  await user.removeRefreshToken(oldRefreshToken);
  
  const refreshTokenExpiry = getTokenExpiration(JWT_REFRESH_EXPIRES_IN);
  const deviceInfo = {
    userAgent: req.get('User-Agent'),
    ip: req.ip
  };
  
  await user.addRefreshToken(newRefreshToken, refreshTokenExpiry, deviceInfo);

  // Update cookie if it was used
  if (tokenFromCookie) {
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
  }

  res.status(200).json({
    success: true,
    message: 'Token refreshed successfully',
    data: {
      accessToken,
      refreshToken: tokenFromCookie ? undefined : newRefreshToken,
      expiresIn: JWT_EXPIRES_IN
    }
  });
});

/**
 * Logout user
 */
export const logout = catchAsync(async (req, res, next) => {
  const { refreshToken: tokenFromBody } = req.body;
  const tokenFromCookie = req.cookies?.refreshToken;
  
  const refreshToken = tokenFromBody || tokenFromCookie;
  
  if (refreshToken && req.user) {
    await req.user.removeRefreshToken(refreshToken);
  }

  // Clear cookie
  res.clearCookie('refreshToken');

  res.status(200).json({
    success: true,
    message: 'Logout successful'
  });
});

/**
 * Logout from all devices
 */
export const logoutAll = catchAsync(async (req, res, next) => {
  await req.user.removeAllRefreshTokens();
  
  // Clear cookie
  res.clearCookie('refreshToken');

  res.status(200).json({
    success: true,
    message: 'Logged out from all devices successfully'
  });
});

/**
 * Forgot password
 */
export const forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new ValidationError({ email: 'Email is required' }));
  }

  // 1) Get user based on email
  const user = await User.findByEmail(email);
  if (!user) {
    return next(new AppError('There is no user with that email address.', 404));
  }

  // 2) Generate random reset token
  const resetToken = crypto.randomBytes(32).toString('hex');

  user.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

  await user.save({ validateBeforeSave: false });

  // 3) Send reset email
  try {
    const resetURL = `${req.protocol}://${req.get('host')}/api/auth/reset-password/${resetToken}`;

    await sendEmail({
      email: user.email,
      subject: 'Password Reset Request - School Management System',
      template: 'passwordReset',
      data: {
        name: user.fullName,
        resetURL,
        expiresIn: '10 minutes'
      }
    });

    res.status(200).json({
      success: true,
      message: 'Password reset token sent to email!'
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new AppError('There was an error sending the email. Try again later.', 500));
  }
});

/**
 * Reset password
 */
export const resetPassword = catchAsync(async (req, res, next) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;

  if (!password || !confirmPassword) {
    return next(new ValidationError({
      password: !password ? 'Password is required' : undefined,
      confirmPassword: !confirmPassword ? 'Password confirmation is required' : undefined
    }));
  }

  if (password !== confirmPassword) {
    return next(new ValidationError({
      confirmPassword: 'Passwords do not match'
    }));
  }

  // 1) Get user based on token
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  });

  // 2) If token has not expired and there is a user, set new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }

  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  
  // Reset login attempts
  user.loginAttempts = 0;
  user.lockUntil = undefined;

  await user.save();

  // 3) Remove all refresh tokens (force re-login)
  await user.removeAllRefreshTokens();

  res.status(200).json({
    success: true,
    message: 'Password has been reset successfully. Please log in with your new password.'
  });
});

/**
 * Verify email
 */
export const verifyEmail = catchAsync(async (req, res, next) => {
  const { token } = req.params;

  // 1) Get user based on token
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationExpires: { $gt: Date.now() }
  });

  // 2) If token has not expired and there is a user, verify email
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }

  user.isEmailVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpires = undefined;

  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: 'Email verified successfully!'
  });
});

/**
 * Change password (for authenticated users)
 */
export const changePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  if (!currentPassword || !newPassword || !confirmPassword) {
    return next(new ValidationError({
      currentPassword: !currentPassword ? 'Current password is required' : undefined,
      newPassword: !newPassword ? 'New password is required' : undefined,
      confirmPassword: !confirmPassword ? 'Password confirmation is required' : undefined
    }));
  }

  if (newPassword !== confirmPassword) {
    return next(new ValidationError({
      confirmPassword: 'Passwords do not match'
    }));
  }

  // 1) Get user with password
  const user = await User.findById(req.user._id).select('+password');

  // 2) Check if current password is correct
  const isCurrentPasswordCorrect = await user.comparePassword(currentPassword);
  if (!isCurrentPasswordCorrect) {
    return next(new AppError('Current password is incorrect', 400));
  }

  // 3) Update password
  user.password = newPassword;
  await user.save();

  // 4) Remove all refresh tokens except current session
  const currentRefreshToken = req.cookies?.refreshToken || req.body.refreshToken;
  if (currentRefreshToken) {
    user.refreshTokens = user.refreshTokens.filter(rt => rt.token === currentRefreshToken);
    await user.save({ validateBeforeSave: false });
  } else {
    await user.removeAllRefreshTokens();
  }

  res.status(200).json({
    success: true,
    message: 'Password changed successfully'
  });
});

/**
 * Get current user profile
 */
export const getMe = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    success: true,
    data: {
      user
    }
  });
});
