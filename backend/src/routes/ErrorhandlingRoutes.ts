import { Router } from 'express';
import ErrorhandlingController from '../controllers/ErrorhandlingController';

const router = Router();

router.get('/', ErrorhandlingController.getAll);
router.get('/:id', ErrorhandlingController.getById);
router.post('/', ErrorhandlingController.create);
router.put('/:id', ErrorhandlingController.update);
router.delete('/:id', ErrorhandlingController.delete);

export default router;
