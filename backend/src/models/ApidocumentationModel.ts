// PostgreSQL model for API Documentation
import { Pool } from 'pg';
import pool from '../config/database';

export interface Apidocumentation {
  id: string;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

export class ApidocumentationModel {
  static async findAll(): Promise<Apidocumentation[]> {
    const result = await pool.query('SELECT * FROM api documentations ORDER BY created_at DESC');
    return result.rows;
  }

  static async findById(id: string): Promise<Apidocumentation | null> {
    const result = await pool.query('SELECT * FROM api documentations WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  static async create(data: Partial<Apidocumentation>): Promise<Apidocumentation> {
    const result = await pool.query(
      'INSERT INTO api documentations (name, description) VALUES ($1, $2) RETURNING *',
      [data.name, data.description]
    );
    return result.rows[0];
  }

  static async update(id: string, data: Partial<Apidocumentation>): Promise<Apidocumentation> {
    const result = await pool.query(
      'UPDATE api documentations SET name = $1, description = $2, updated_at = NOW() WHERE id = $3 RETURNING *',
      [data.name, data.description, id]
    );
    return result.rows[0];
  }

  static async delete(id: string): Promise<boolean> {
    const result = await pool.query('DELETE FROM api documentations WHERE id = $1', [id]);
    return result.rowCount > 0;
  }
}
