import { Router } from 'express';
import CodequalityanalysisController from '../controllers/CodequalityanalysisController';

const router = Router();

router.get('/', CodequalityanalysisController.getAll);
router.get('/:id', CodequalityanalysisController.getById);
router.post('/', CodequalityanalysisController.create);
router.put('/:id', CodequalityanalysisController.update);
router.delete('/:id', CodequalityanalysisController.delete);

export default router;
