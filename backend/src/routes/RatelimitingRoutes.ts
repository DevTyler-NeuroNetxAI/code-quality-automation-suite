import { Router } from 'express';
import RatelimitingController from '../controllers/RatelimitingController';

const router = Router();

router.get('/', RatelimitingController.getAll);
router.get('/:id', RatelimitingController.getById);
router.post('/', RatelimitingController.create);
router.put('/:id', RatelimitingController.update);
router.delete('/:id', RatelimitingController.delete);

export default router;
