import { Router } from 'express';
import MonitoringdashboardController from '../controllers/MonitoringdashboardController';

const router = Router();

router.get('/', MonitoringdashboardController.getAll);
router.get('/:id', MonitoringdashboardController.getById);
router.post('/', MonitoringdashboardController.create);
router.put('/:id', MonitoringdashboardController.update);
router.delete('/:id', MonitoringdashboardController.delete);

export default router;
