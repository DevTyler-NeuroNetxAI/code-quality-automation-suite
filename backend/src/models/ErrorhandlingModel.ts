// PostgreSQL model for Error Handling
import { Pool } from 'pg';
import pool from '../config/database';

export interface Errorhandling {
  id: string;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

export class ErrorhandlingModel {
  static async findAll(): Promise<Errorhandling[]> {
    const result = await pool.query('SELECT * FROM error handlings ORDER BY created_at DESC');
    return result.rows;
  }

  static async findById(id: string): Promise<Errorhandling | null> {
    const result = await pool.query('SELECT * FROM error handlings WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  static async create(data: Partial<Errorhandling>): Promise<Errorhandling> {
    const result = await pool.query(
      'INSERT INTO error handlings (name, description) VALUES ($1, $2) RETURNING *',
      [data.name, data.description]
    );
    return result.rows[0];
  }

  static async update(id: string, data: Partial<Errorhandling>): Promise<Errorhandling> {
    const result = await pool.query(
      'UPDATE error handlings SET name = $1, description = $2, updated_at = NOW() WHERE id = $3 RETURNING *',
      [data.name, data.description, id]
    );
    return result.rows[0];
  }

  static async delete(id: string): Promise<boolean> {
    const result = await pool.query('DELETE FROM error handlings WHERE id = $1', [id]);
    return result.rowCount > 0;
  }
}
