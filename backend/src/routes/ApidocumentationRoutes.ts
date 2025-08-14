import { Router } from 'express';
import ApidocumentationController from '../controllers/ApidocumentationController';

const router = Router();

router.get('/', ApidocumentationController.getAll);
router.get('/:id', ApidocumentationController.getById);
router.post('/', ApidocumentationController.create);
router.put('/:id', ApidocumentationController.update);
router.delete('/:id', ApidocumentationController.delete);

export default router;
