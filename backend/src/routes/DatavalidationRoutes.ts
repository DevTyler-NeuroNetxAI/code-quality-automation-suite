import { Router } from 'express';
import DatavalidationController from '../controllers/DatavalidationController';

const router = Router();

router.get('/', DatavalidationController.getAll);
router.get('/:id', DatavalidationController.getById);
router.post('/', DatavalidationController.create);
router.put('/:id', DatavalidationController.update);
router.delete('/:id', DatavalidationController.delete);

export default router;
