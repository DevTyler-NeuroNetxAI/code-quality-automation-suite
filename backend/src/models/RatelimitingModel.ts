// PostgreSQL model for Rate Limiting
import { Pool } from 'pg';
import pool from '../config/database';

export interface Ratelimiting {
  id: string;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

export class RatelimitingModel {
  static async findAll(): Promise<Ratelimiting[]> {
    const result = await pool.query('SELECT * FROM rate limitings ORDER BY created_at DESC');
    return result.rows;
  }

  static async findById(id: string): Promise<Ratelimiting | null> {
    const result = await pool.query('SELECT * FROM rate limitings WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  static async create(data: Partial<Ratelimiting>): Promise<Ratelimiting> {
    const result = await pool.query(
      'INSERT INTO rate limitings (name, description) VALUES ($1, $2) RETURNING *',
      [data.name, data.description]
    );
    return result.rows[0];
  }

  static async update(id: string, data: Partial<Ratelimiting>): Promise<Ratelimiting> {
    const result = await pool.query(
      'UPDATE rate limitings SET name = $1, description = $2, updated_at = NOW() WHERE id = $3 RETURNING *',
      [data.name, data.description, id]
    );
    return result.rows[0];
  }

  static async delete(id: string): Promise<boolean> {
    const result = await pool.query('DELETE FROM rate limitings WHERE id = $1', [id]);
    return result.rowCount > 0;
  }
}
