import express from 'express';
import TrainerController from '../controllers/trainer.controller.js';

const router = express.Router();

router.get('/', TrainerController.getAllTrainers);
router.get('/:id', TrainerController.getTrainerById);
router.post('/', TrainerController.createTrainer);
router.put('/:id', TrainerController.updateTrainer);
router.delete('/:id', TrainerController.deleteTrainer);
router.delete('/', TrainerController.deleteAllTrainers);

export default router;