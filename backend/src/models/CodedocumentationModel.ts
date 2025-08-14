// PostgreSQL model for Code Documentation
import { Pool } from 'pg';
import pool from '../config/database';

export interface Codedocumentation {
  id: string;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

export class CodedocumentationModel {
  static async findAll(): Promise<Codedocumentation[]> {
    const result = await pool.query('SELECT * FROM code documentations ORDER BY created_at DESC');
    return result.rows;
  }

  static async findById(id: string): Promise<Codedocumentation | null> {
    const result = await pool.query('SELECT * FROM code documentations WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  static async create(data: Partial<Codedocumentation>): Promise<Codedocumentation> {
    const result = await pool.query(
      'INSERT INTO code documentations (name, description) VALUES ($1, $2) RETURNING *',
      [data.name, data.description]
    );
    return result.rows[0];
  }

  static async update(id: string, data: Partial<Codedocumentation>): Promise<Codedocumentation> {
    const result = await pool.query(
      'UPDATE code documentations SET name = $1, description = $2, updated_at = NOW() WHERE id = $3 RETURNING *',
      [data.name, data.description, id]
    );
    return result.rows[0];
  }

  static async delete(id: string): Promise<boolean> {
    const result = await pool.query('DELETE FROM code documentations WHERE id = $1', [id]);
    return result.rowCount > 0;
  }
}
