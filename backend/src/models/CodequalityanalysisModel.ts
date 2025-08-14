// PostgreSQL model for Code Quality Analysis
import { Pool } from 'pg';
import pool from '../config/database';

export interface Codequalityanalysis {
  id: string;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

export class CodequalityanalysisModel {
  static async findAll(): Promise<Codequalityanalysis[]> {
    const result = await pool.query('SELECT * FROM code quality analysiss ORDER BY created_at DESC');
    return result.rows;
  }

  static async findById(id: string): Promise<Codequalityanalysis | null> {
    const result = await pool.query('SELECT * FROM code quality analysiss WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  static async create(data: Partial<Codequalityanalysis>): Promise<Codequalityanalysis> {
    const result = await pool.query(
      'INSERT INTO code quality analysiss (name, description) VALUES ($1, $2) RETURNING *',
      [data.name, data.description]
    );
    return result.rows[0];
  }

  static async update(id: string, data: Partial<Codequalityanalysis>): Promise<Codequalityanalysis> {
    const result = await pool.query(
      'UPDATE code quality analysiss SET name = $1, description = $2, updated_at = NOW() WHERE id = $3 RETURNING *',
      [data.name, data.description, id]
    );
    return result.rows[0];
  }

  static async delete(id: string): Promise<boolean> {
    const result = await pool.query('DELETE FROM code quality analysiss WHERE id = $1', [id]);
    return result.rowCount > 0;
  }
}
