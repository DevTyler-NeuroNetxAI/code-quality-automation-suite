import { Router } from 'express';
import UserauthenticationController from '../controllers/UserauthenticationController';

const router = Router();

router.get('/', UserauthenticationController.getAll);
router.get('/:id', UserauthenticationController.getById);
router.post('/', UserauthenticationController.create);
router.put('/:id', UserauthenticationController.update);
router.delete('/:id', UserauthenticationController.delete);

export default router;
