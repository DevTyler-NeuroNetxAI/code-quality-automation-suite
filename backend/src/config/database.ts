/**
 * database.ts
 * Generated for: Code Quality Automation Suite
 * Generated at: 2025-08-14T18:44:31.477Z
 * Auto Project Maker - Enterprise Code Generator
 */

import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

export const query = (text: string, params?: any[]) => pool.query(text, params);

export default pool;
