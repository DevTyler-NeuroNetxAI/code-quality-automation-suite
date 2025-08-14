// PostgreSQL model for Data Validation
import { Pool } from 'pg';
import pool from '../config/database';

export interface Datavalidation {
  id: string;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

export class DatavalidationModel {
  static async findAll(): Promise<Datavalidation[]> {
    const result = await pool.query('SELECT * FROM data validations ORDER BY created_at DESC');
    return result.rows;
  }

  static async findById(id: string): Promise<Datavalidation | null> {
    const result = await pool.query('SELECT * FROM data validations WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  static async create(data: Partial<Datavalidation>): Promise<Datavalidation> {
    const result = await pool.query(
      'INSERT INTO data validations (name, description) VALUES ($1, $2) RETURNING *',
      [data.name, data.description]
    );
    return result.rows[0];
  }

  static async update(id: string, data: Partial<Datavalidation>): Promise<Datavalidation> {
    const result = await pool.query(
      'UPDATE data validations SET name = $1, description = $2, updated_at = NOW() WHERE id = $3 RETURNING *',
      [data.name, data.description, id]
    );
    return result.rows[0];
  }

  static async delete(id: string): Promise<boolean> {
    const result = await pool.query('DELETE FROM data validations WHERE id = $1', [id]);
    return result.rowCount > 0;
  }
}
