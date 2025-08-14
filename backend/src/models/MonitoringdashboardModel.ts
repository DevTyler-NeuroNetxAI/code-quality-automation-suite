// PostgreSQL model for Monitoring Dashboard
import { Pool } from 'pg';
import pool from '../config/database';

export interface Monitoringdashboard {
  id: string;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

export class MonitoringdashboardModel {
  static async findAll(): Promise<Monitoringdashboard[]> {
    const result = await pool.query('SELECT * FROM monitoring dashboards ORDER BY created_at DESC');
    return result.rows;
  }

  static async findById(id: string): Promise<Monitoringdashboard | null> {
    const result = await pool.query('SELECT * FROM monitoring dashboards WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  static async create(data: Partial<Monitoringdashboard>): Promise<Monitoringdashboard> {
    const result = await pool.query(
      'INSERT INTO monitoring dashboards (name, description) VALUES ($1, $2) RETURNING *',
      [data.name, data.description]
    );
    return result.rows[0];
  }

  static async update(id: string, data: Partial<Monitoringdashboard>): Promise<Monitoringdashboard> {
    const result = await pool.query(
      'UPDATE monitoring dashboards SET name = $1, description = $2, updated_at = NOW() WHERE id = $3 RETURNING *',
      [data.name, data.description, id]
    );
    return result.rows[0];
  }

  static async delete(id: string): Promise<boolean> {
    const result = await pool.query('DELETE FROM monitoring dashboards WHERE id = $1', [id]);
    return result.rowCount > 0;
  }
}
