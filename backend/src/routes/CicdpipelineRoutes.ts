import { Router } from 'express';
import CicdpipelineController from '../controllers/CicdpipelineController';

const router = Router();

router.get('/', CicdpipelineController.getAll);
router.get('/:id', CicdpipelineController.getById);
router.post('/', CicdpipelineController.create);
router.put('/:id', CicdpipelineController.update);
router.delete('/:id', CicdpipelineController.delete);

export default router;
