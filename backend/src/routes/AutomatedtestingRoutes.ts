import { Router } from 'express';
import AutomatedtestingController from '../controllers/AutomatedtestingController';

const router = Router();

router.get('/', AutomatedtestingController.getAll);
router.get('/:id', AutomatedtestingController.getById);
router.post('/', AutomatedtestingController.create);
router.put('/:id', AutomatedtestingController.update);
router.delete('/:id', AutomatedtestingController.delete);

export default router;
