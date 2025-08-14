/**
 * app.ts
 * Generated for: Code Quality Automation Suite
 * Generated at: 2025-08-14T18:44:31.477Z
 * Auto Project Maker - Enterprise Code Generator
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler } from './middleware/errorHandler';
import { auth } from './middleware/auth';
import healthRoutes from './routes/healthRoutes';

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// API routes
app.use('/api/v1/health', healthRoutes);

// Authentication middleware for protected routes
app.use('/api/v1', auth);

// Error handling middleware (must be last)
app.use(errorHandler);

export { app };
