import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.join(__dirname, '../data/trainers.json');

export default class TrainerModel {
    static async getAllTrainers(query = {}) {
        const data = await fs.readFile(dataPath, 'utf8');
        let trainers = JSON.parse(data).trainers;

        if (query.currentlyActive !== undefined) {
            trainers = trainers.filter(t => 
                t.isCurrentlyTeaching === (query.currentlyActive === 'true'));
        }

        if (query.sortBy) {
            trainers.sort((a, b) => {
                if (query.sortBy === 'coursesAsc') {
                    return a.coursesFinished - b.coursesFinished;
                }
                return b.coursesFinished - a.coursesFinished;
            });
        }

        return trainers;
    }

    static async getTrainerById(id) {
        const data = await fs.readFile(dataPath, 'utf8');
        const trainers = JSON.parse(data).trainers;
        return trainers.find(t => t.id === id);
    }

    static async createTrainer(trainerData) {
        const data = await fs.readFile(dataPath, 'utf8');
        const trainers = JSON.parse(data).trainers;
        trainers.push(trainerData);
        await fs.writeFile(dataPath, JSON.stringify({ trainers }, null, 2));
        return trainerData;
    }

    static async updateTrainer(id, updates) {
        const data = await fs.readFile(dataPath, 'utf8');
        const trainers = JSON.parse(data).trainers;
        const index = trainers.findIndex(t => t.id === id);
        if (index === -1) return null;
        
        trainers[index] = { ...trainers[index], ...updates };
        await fs.writeFile(dataPath, JSON.stringify({ trainers }, null, 2));
        return trainers[index];
    }

    static async deleteTrainer(id) {
        const data = await fs.readFile(dataPath, 'utf8');
        const trainers = JSON.parse(data).trainers;
        const filtered = trainers.filter(t => t.id !== id);
        await fs.writeFile(dataPath, JSON.stringify({ trainers: filtered }, null, 2));
        return true;
    }

    static async deleteAllTrainers() {
        await fs.writeFile(dataPath, JSON.stringify({ trainers: [] }, null, 2));
        return true;
    }
}