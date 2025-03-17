import { v4 as uuidv4 } from 'uuid';
import TrainerModel from '../models/trainer.model.js';

export default class TrainerController {
    static async getAllTrainers(req, res) {
        try {
            const trainers = await TrainerModel.getAllTrainers(req.query);
            res.json(trainers);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getTrainerById(req, res) {
        try {
            const trainer = await TrainerModel.getTrainerById(req.params.id);
            if (!trainer) {
                return res.status(404).json({ message: 'Trainer not found' });
            }
            res.json(trainer);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async createTrainer(req, res) {
        try {
            const trainerData = {
                id: uuidv4(),
                ...req.body
            };
            const trainer = await TrainerModel.createTrainer(trainerData);
            res.status(201).json(trainer);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async updateTrainer(req, res) {
        try {
            const trainer = await TrainerModel.updateTrainer(req.params.id, req.body);
            if (!trainer) {
                return res.status(404).json({ message: 'Trainer not found' });
            }
            res.json(trainer);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async deleteTrainer(req, res) {
        try {
            await TrainerModel.deleteTrainer(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async deleteAllTrainers(req, res) {
        try {
            await TrainerModel.deleteAllTrainers();
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}