// Shared constants for Code Quality Automation Suite

export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api/v1';

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
} as const;

export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  MIN_LENGTH: (min: number) => `Minimum length is ${min} characters`,
  MAX_LENGTH: (max: number) => `Maximum length is ${max} characters`
} as const;

export const FEATURE_FLAGS = {
  USER_AUTHENTICATION: true,
  API_DOCUMENTATION: true,
  DATA_VALIDATION: true,
  RATE_LIMITING: true,
  AUTOMATED_TESTING: true,
  CODE_QUALITY_ANALYSIS: true,
  CODE_DOCUMENTATION: true,
  CI/CD_PIPELINE: true,
  ERROR_HANDLING: true,
  MONITORING_DASHBOARD: true
} as const;
