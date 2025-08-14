/**
 * server.ts
 * Generated for: Code Quality Automation Suite
 * Generated at: 2025-08-14T18:44:31.477Z
 * Auto Project Maker - Enterprise Code Generator
 */

import dotenv from 'dotenv';
import { app } from './app';
import { logger } from './utils/logger';
import { connectDatabase } from './config/database';

dotenv.config();

const PORT = process.env.PORT || 3001;

async function startServer() {
  try {
    await connectDatabase();
    
    app.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT}`);
      logger.info(`📖 API documentation available at http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
