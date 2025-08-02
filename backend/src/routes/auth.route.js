import { Router } from 'express';
import {
  register,
  login,
  refreshToken,
  logout,
  logoutAll,
  forgotPassword,
  resetPassword,
  verifyEmail,
  changePassword,
  getMe
} from '../controllers/auth.controller.js';
import {
  authenticate,
  authorize,
  validateRefreshToken
} from '../middleware/auth.middleware.js';
import { validateRequest } from '../middleware/validation.middleware.js';
import {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema
} from '../validators/auth.validator.js';

const router = Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public (or Admin only for creating staff accounts)
 */
router.post('/register', validateRequest(registerSchema), register);

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post('/login', validateRequest(loginSchema), login);

/**
 * @route   POST /api/auth/refresh-token
 * @desc    Refresh access token
 * @access  Public (requires valid refresh token)
 */
router.post('/refresh-token', validateRequest(refreshTokenSchema), validateRefreshToken, refreshToken);

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user (invalidate refresh token)
 * @access  Private
 */
router.post('/logout', authenticate, logout);

/**
 * @route   POST /api/auth/logout-all
 * @desc    Logout from all devices
 * @access  Private
 */
router.post('/logout-all', authenticate, logoutAll);

/**
 * @route   POST /api/auth/forgot-password
 * @desc    Send password reset email
 * @access  Public
 */
router.post('/forgot-password', validateRequest(forgotPasswordSchema), forgotPassword);

/**
 * @route   POST /api/auth/reset-password/:token
 * @desc    Reset password with token
 * @access  Public
 */
router.post('/reset-password/:token', validateRequest(resetPasswordSchema), resetPassword);

/**
 * @route   GET /api/auth/verify-email/:token
 * @desc    Verify email address
 * @access  Public
 */
router.get('/verify-email/:token', verifyEmail);

/**
 * @route   POST /api/auth/change-password
 * @desc    Change password (for authenticated users)
 * @access  Private
 */
router.post('/change-password', authenticate, validateRequest(changePasswordSchema), changePassword);

/**
 * @route   GET /api/auth/me
 * @desc    Get current user profile
 * @access  Private
 */
router.get('/me', authenticate, getMe);

/**
 * @route   POST /api/auth/admin/register
 * @desc    Register user by admin (can create any role)
 * @access  Private (Admin only)
 */
router.post('/admin/register', authenticate, authorize('admin'), validateRequest(registerSchema), register);

export default router;
