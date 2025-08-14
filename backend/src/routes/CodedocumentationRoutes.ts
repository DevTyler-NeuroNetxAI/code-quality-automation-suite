import { Router } from 'express';
import CodedocumentationController from '../controllers/CodedocumentationController';

const router = Router();

router.get('/', CodedocumentationController.getAll);
router.get('/:id', CodedocumentationController.getById);
router.post('/', CodedocumentationController.create);
router.put('/:id', CodedocumentationController.update);
router.delete('/:id', CodedocumentationController.delete);

export default router;
