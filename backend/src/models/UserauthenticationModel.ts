// PostgreSQL model for User Authentication
import { Pool } from 'pg';
import pool from '../config/database';

export interface Userauthentication {
  id: string;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

export class UserauthenticationModel {
  static async findAll(): Promise<Userauthentication[]> {
    const result = await pool.query('SELECT * FROM user authentications ORDER BY created_at DESC');
    return result.rows;
  }

  static async findById(id: string): Promise<Userauthentication | null> {
    const result = await pool.query('SELECT * FROM user authentications WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  static async create(data: Partial<Userauthentication>): Promise<Userauthentication> {
    const result = await pool.query(
      'INSERT INTO user authentications (name, description) VALUES ($1, $2) RETURNING *',
      [data.name, data.description]
    );
    return result.rows[0];
  }

  static async update(id: string, data: Partial<Userauthentication>): Promise<Userauthentication> {
    const result = await pool.query(
      'UPDATE user authentications SET name = $1, description = $2, updated_at = NOW() WHERE id = $3 RETURNING *',
      [data.name, data.description, id]
    );
    return result.rows[0];
  }

  static async delete(id: string): Promise<boolean> {
    const result = await pool.query('DELETE FROM user authentications WHERE id = $1', [id]);
    return result.rowCount > 0;
  }
}
