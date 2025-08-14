import { Request, Response } from 'express';
import { ErrorhandlingService } from '../services/ErrorhandlingService';

export class ErrorhandlingController {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const items = await ErrorhandlingService.getAll();
      res.json({ success: true, data: items });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to fetch items' });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const item = await ErrorhandlingService.getById(id);
      if (!item) {
        res.status(404).json({ success: false, error: 'Item not found' });
        return;
      }
      res.json({ success: true, data: item });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to fetch item' });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const item = await ErrorhandlingService.create(req.body);
      res.status(201).json({ success: true, data: item });
    } catch (error) {
      res.status(400).json({ success: false, error: 'Failed to create item' });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const item = await ErrorhandlingService.update(id, req.body);
      res.json({ success: true, data: item });
    } catch (error) {
      res.status(400).json({ success: false, error: 'Failed to update item' });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await ErrorhandlingService.delete(id);
      res.json({ success: true, message: 'Item deleted successfully' });
    } catch (error) {
      res.status(400).json({ success: false, error: 'Failed to delete item' });
    }
  }
}

export default new ErrorhandlingController();
