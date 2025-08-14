import { Request, Response } from 'express';
import { AutomatedtestingService } from '../services/AutomatedtestingService';

export class AutomatedtestingController {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const items = await AutomatedtestingService.getAll();
      res.json({ success: true, data: items });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to fetch items' });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const item = await AutomatedtestingService.getById(id);
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
      const item = await AutomatedtestingService.create(req.body);
      res.status(201).json({ success: true, data: item });
    } catch (error) {
      res.status(400).json({ success: false, error: 'Failed to create item' });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const item = await AutomatedtestingService.update(id, req.body);
      res.json({ success: true, data: item });
    } catch (error) {
      res.status(400).json({ success: false, error: 'Failed to update item' });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await AutomatedtestingService.delete(id);
      res.json({ success: true, message: 'Item deleted successfully' });
    } catch (error) {
      res.status(400).json({ success: false, error: 'Failed to delete item' });
    }
  }
}

export default new AutomatedtestingController();
