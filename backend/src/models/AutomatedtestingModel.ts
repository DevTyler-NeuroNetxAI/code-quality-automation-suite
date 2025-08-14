// PostgreSQL model for Automated Testing
import { Pool } from 'pg';
import pool from '../config/database';

export interface Automatedtesting {
  id: string;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

export class AutomatedtestingModel {
  static async findAll(): Promise<Automatedtesting[]> {
    const result = await pool.query('SELECT * FROM automated testings ORDER BY created_at DESC');
    return result.rows;
  }

  static async findById(id: string): Promise<Automatedtesting | null> {
    const result = await pool.query('SELECT * FROM automated testings WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  static async create(data: Partial<Automatedtesting>): Promise<Automatedtesting> {
    const result = await pool.query(
      'INSERT INTO automated testings (name, description) VALUES ($1, $2) RETURNING *',
      [data.name, data.description]
    );
    return result.rows[0];
  }

  static async update(id: string, data: Partial<Automatedtesting>): Promise<Automatedtesting> {
    const result = await pool.query(
      'UPDATE automated testings SET name = $1, description = $2, updated_at = NOW() WHERE id = $3 RETURNING *',
      [data.name, data.description, id]
    );
    return result.rows[0];
  }

  static async delete(id: string): Promise<boolean> {
    const result = await pool.query('DELETE FROM automated testings WHERE id = $1', [id]);
    return result.rowCount > 0;
  }
}
