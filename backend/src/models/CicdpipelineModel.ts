// PostgreSQL model for CI/CD Pipeline
import { Pool } from 'pg';
import pool from '../config/database';

export interface Cicdpipeline {
  id: string;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

export class CicdpipelineModel {
  static async findAll(): Promise<Cicdpipeline[]> {
    const result = await pool.query('SELECT * FROM ci/cd pipelines ORDER BY created_at DESC');
    return result.rows;
  }

  static async findById(id: string): Promise<Cicdpipeline | null> {
    const result = await pool.query('SELECT * FROM ci/cd pipelines WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  static async create(data: Partial<Cicdpipeline>): Promise<Cicdpipeline> {
    const result = await pool.query(
      'INSERT INTO ci/cd pipelines (name, description) VALUES ($1, $2) RETURNING *',
      [data.name, data.description]
    );
    return result.rows[0];
  }

  static async update(id: string, data: Partial<Cicdpipeline>): Promise<Cicdpipeline> {
    const result = await pool.query(
      'UPDATE ci/cd pipelines SET name = $1, description = $2, updated_at = NOW() WHERE id = $3 RETURNING *',
      [data.name, data.description, id]
    );
    return result.rows[0];
  }

  static async delete(id: string): Promise<boolean> {
    const result = await pool.query('DELETE FROM ci/cd pipelines WHERE id = $1', [id]);
    return result.rowCount > 0;
  }
}
